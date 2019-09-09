async function run_test() {
  let res = await axios.get(`http://localhost:${port}/applicant`, {
    params: {
      filter: `{"id": "CarrotParsley"}`
    }
  })
  console.log(res.data)
  res = await axios.put(`http://localhost:${port}/applicant`, {
    data: `{"id": "CarrotParsley", "newattr": "hi!"}`
  })
  console.log(res.data)
  console.log('-------------')
  res = await axios.get(`http://localhost:${port}/application`, {
    params: {
      filter: `{"university": "Carnegie Mellon University", "program": "Master of Science in Information Networking"}`
    }
  })
  console.log(res.data)
  res = await axios.put(`http://localhost:${port}/application`, {
    data: `{"university": "test1", "program": "test", "at": "emmmm"}`
  })
  console.log(res.data)
  console.log('-------------')
  res = await axios.get(`http://localhost:${port}/university`, {
    params: {
      filter: `{"abbreviation": "NEU"}`
    }
  })
  console.log(res.data)
  res = await axios.put(`http://localhost:${port}/university`, {
    data: `{"name": "new uni!", "newattr": "hi!"}`
  })
  console.log(res.data)
  console.log('-------------')
  res = await axios.get(`http://localhost:${port}/program`, {
    params: {
      filter: `{"university": "Carnegie Mellon University", "name": "Master of Science in Information Networking"}`
    }
  })
  console.log(res.data)
  res = await axios.put(`http://localhost:${port}/program`, {
    data: `{"university": "CarrotParsley", "name": "hi!"}`
  })
  console.log(res.data)
}
