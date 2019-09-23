import { api_uri } from '../config'
import axios from 'axios'
import _ from 'lodash'
import { University, Program, Applicant, Application } from './type'

async function get_all_universities(): Promise<University[]> {
  let res = await axios.get(`${api_uri}university`, {
    params: {
      filter: `{}`
    }
  })
  return res.data
}

async function get_university_by_name(name: string): Promise<University> {
  let res = await axios.get(`${api_uri}university`, {
    params: {
      filter: `{"name": "${name}"}`
    }
  })
  return res.data[0]
}

async function get_programs_by_university(university_name: string): Promise<Program[]> {
  let res = await axios.get(`${api_uri}program`, {
    params: {
      filter: `{"university": "${university_name}"}`
    }
  })
  return res.data
}

async function get_programs_by_universities(university_names: string[]): Promise<Program[][]> {
  let res = await axios.post(`${api_uri}programs`, {
    filters: university_names.map(u => `{"university": "${u}"}`)
  })
  console.log(university_names, res.data)
  return res.data
}

async function get_applicant_by_id(id: string): Promise<Applicant> {
  let res = await axios.get(`${api_uri}applicant`, {
    params: {
      filter: `{"id": "${id}"}`
    }
  })
  return res.data[0]
}

async function get_applicants_by_ids(ids: string[]): Promise<Applicant[]> {
  let res = await axios.post(`${api_uri}applicants`, {
    filters: ids.map(i => `{"id": "${i}"}`)
  })
  return res.data
}

async function get_all_applicants(): Promise<Applicant[]> {
  let res = await axios.get(`${api_uri}applicant`, {
    params: {
      filter: `{}`
    }
  })
  return res.data
}

async function get_all_applications(): Promise<Application[]> {
  let res = await axios.get(`${api_uri}application`, {
    params: {
      filter: `{}`
    }
  })
  return res.data
}

async function get_applications_by_university(university_name: string): Promise<Application[]> {
  let res = await axios.get(`${api_uri}application`, {
    params: {
      filter: `{"university": "${university_name}"}`
    }
  })
  return res.data
}

async function get_applications_by_university_and_program(
  university_name: string, program_name: string): Promise<Application[]> {
  let res = await axios.get(`${api_uri}application`, {
    params: {
      filter: `{"university": "${university_name}", "program": "${program_name}"}`
    }
  })
  return res.data
}

async function get_applications_by_applicant(applicant_id: string): Promise<Application[]> {
  let res = await axios.get(`${api_uri}application`, {
    params: {
      filter: `{"applicant": "${applicant_id}"}`
    }
  })
  return res.data
}

function get_histogram_counts(
  data: number[],
  range: [number, number],
  num_bins: number
): number[] {
  let interval_counts = _.fill(Array(num_bins), 0)
  let interval = (range[1] - range[0]) / num_bins
  data.forEach(v => {
    if (v === range[1]) interval_counts[num_bins - 1] ++
    else interval_counts[Math.floor((v - range[0]) / interval)] ++
  })
  return interval_counts
}

function linspace(
  start: number, end: number, num: number,
  include_end: boolean = true
): number[] {
  let res = Array(num)
  let step = (end - start) / (num - 1)
  for (let i = 0; i < num; i++)
    res[i] = start + i * step
  return res
}

function all_attr_is_null(obj: any): boolean {
  if (typeof obj !== 'object') return false
  let keys = Object.keys(obj)
  for (let k of keys) {
    if (obj[k] === null || obj[k] === undefined)
      continue
    if (typeof obj[k] === 'object') {
      if (!all_attr_is_null(obj[k]))
      return false
    } else if (obj[k] !== null || obj[k] !== undefined) {
      return false
    }
  }
  return true
}

export {
  get_all_universities,
  get_university_by_name,
  get_programs_by_university,
  get_all_applicants,
  get_applicant_by_id,
  get_all_applications,
  get_applications_by_university,
  get_applications_by_university_and_program,
  get_applications_by_applicant,
  get_programs_by_universities,
  get_applicants_by_ids,

  get_histogram_counts,
  linspace,
  all_attr_is_null
}
