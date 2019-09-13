import { api_uri } from '../config'
import axios from 'axios'
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

async function get_applicant_by_id(id: string): Promise<Applicant> {
  let res = await axios.get(`${api_uri}applicant`, {
    params: {
      filter: `{"id": "${id}"}`
    }
  })
  return res.data[0]
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

async function get_applications_by_applicant(applicant_id: string): Promise<Application[]> {
  let res = await axios.get(`${api_uri}application`, {
    params: {
      filter: `{"applicant": "${applicant_id}"}`
    }
  })
  return res.data
}

export {
  get_all_universities,
  get_university_by_name,
  get_programs_by_university,
  get_all_applicants,
  get_applicant_by_id,
  get_all_applications,
  get_applications_by_university,
  get_applications_by_applicant
}
