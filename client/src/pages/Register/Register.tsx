import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { z } from "zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';


const schema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(6),
  role: z.string().default("Customer")
})

type FormValues = z.infer<typeof schema>

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Data : ", data)

    try {
      reset()
      let response = await axios.post('http://localhost:1337/register', { ...data })
      // // console.log(response)
      if (response.status == 201) {
        reset()
      }

    } catch (err) {
      console.log(err)
    }

  }

  const content = (
    <section className="w-80 mx-auto ">
      <header className='flex w-full justify-center'>
        <h1 className="text-3xl font-bold my-[1.5em]"> Register </h1>
      </header>
      <main className="bg-gray-100 rounded-lg p-6">
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="text-black font-bold block mb-2">
              Name:
            </label>
            <input
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              id="name"
              {...register("name", { required: "Email is required" })}
              autoComplete="off"

            />
            {
              errors.name && (
                <div className='text-red-500 text-5'>{errors.name.message}</div>
              )
            }
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="text-black font-bold block mb-2">
              Email:
            </label>
            <input
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              id="email"
              {...register("email", {
                required: "Email is required"
              })}
              autoComplete="off"

            />
            {
              errors.email && (
                <div className='text-red-500 text-5'>{errors.email.message}</div>
              )
            }
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="text-black font-bold block mb-2">
              Phone:
            </label>
            <input
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              id="phone"
              type="text"
              {...register("phone", {
                required: "Phone is required",
              })}
              autoComplete="off"
            />
            {
              errors.phone && (
                <div className='text-red-500 text-5'>{errors.phone.message}</div>
              )
            }
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-black font-bold block mb-2">
              Password:
            </label>
            <input
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",

              })}

            />
            {
              errors.password && (
                <div className='text-red-500 text-5'>{errors.password.message}</div>
              )
            }
          </div>

          <div className="flex text-center justify-around flex-col mt-[2em]">
            <button disabled={isSubmitting} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Create account" >
              {isSubmitting ? "Loading..." : "Submit"}
            </button>
            <Link to={'/login'} className=" text-indigo-500 underline font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
              Already have an account ?
            </Link>
          </div>
        </form>
      </main>

    </section>

  )

  return content

}

export default Register;
