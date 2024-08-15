import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Create () {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: ""
  })


  const handleChange = e => {
    const { name, value } = e.target
    setForm(prevForm => ({...prevForm, [name]: value
    }))
  }

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    console.log('Form submitted:', form)
    try {
      const response = await fetch('http://localhost:4000/record/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(form)
      })

      if (response.status === 400) {
        window.alert("Email Already Exists")
        setForm({ lastName: "", firstName: "", email: "" , phone: "", password: "", });
        navigate('/create')
      } else {
        navigate('/accountSummary')
      }
    
    } catch (err) {
      window.alert("Accocount Creation has has failed: " + err.message)
      setForm({ lastName: "", firstName: "", email: "" , phone: "", password: "", });
    }
  }

  return (
  
    <form onSubmit={handleSubmit}>
    <h1>Account Creation</h1>
      <div>
        <label>First Name:</label>
        <br/>
        <input
          name="firstName"
          type="text"
          value={form.firstName}
          onChange={handleChange}
        />
      </div>
      <label>Last Name: </label>
      <div>
        <input
          name="lastName"
          type="text"
          value={form.lastName}
          onChange={handleChange}
        />
      </div>
      <label>Email:</label>
      <div>
        <input
          name="email"
          type="text"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <label>Phone:</label>
      <div>
        <input
          name="phone"
          type="text"
          value={form.phone}
          onChange={handleChange}
        />
      </div>
      <label>Password: </label>
      <div>
        <input
          name="password"
          type="text"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <button type='submit'>Create Account</button>
    </form>
  )
}
