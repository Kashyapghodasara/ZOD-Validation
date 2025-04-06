import { useState } from "react"
import { formErrors, userForm, userFormSchema } from "./types/userForm"

const UserForm = () => {
    const [formData, setFormData] = useState<userForm>({
        name: "",
        email: "",
        age: 0,
        phone: "",
        password: "",
        confirmpassword: "",
        gender: "male"
    })

    const [error, setErrors] = useState<formErrors>()

    const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: name === 'age' ? (value ? Number(value) : 0) : value
        })
        // Clear Error message
        setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = userFormSchema.safeParse(formData);

        if (!result.success) {
            setErrors(result.error.formErrors.fieldErrors)
        } else {
            setErrors({})
            console.log(formData)
        }
    }

    return (
        <div className="flex flex-col justify-center gap-4 m-auto w-[50%]">
            <h1 className="font-semibold flex justify-center text-3xl">User Form Validation</h1>
            <form onSubmit={onSubmitHandler} className="flex flex-col justify-center gap-2">
                <div className="flex flex-col gap-1">
                    <label htmlFor="Name" className="font-bold">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={changeInputHandler}
                        placeholder="Name"
                        className="border border-gray-200 rounded-md p-1" />
                    {error?.name && <span className="text-red-500">{error.name}</span>}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="Email" className="font-bold">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={changeInputHandler}
                        placeholder="Email"
                        className="border border-gray-200 rounded-md p-1" />
                        {error?.email && <span className="text-red-500">{error.email}</span>}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="Age" className="font-bold">Age</label>
                    <input
                        name="age"
                        type="string"
                        value={formData.age}
                        onChange={changeInputHandler}
                        placeholder="Age"
                        className="border border-gray-200 rounded-md p-1" />
                        {error?.age && <span className="text-red-500">{error.age}</span>}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="Phone No" className="font-bold">Phone No</label>
                    <input
                        name="phone"
                        type="phone"
                        value={formData.phone}
                        onChange={changeInputHandler}
                        placeholder="Phone No"
                        className="border border-gray-200 rounded-md p-1" />
                         {error?.phone && <span className="text-red-500">{error.phone}</span>}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="Password" className="font-bold">Password</label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={changeInputHandler}
                        placeholder="Password"
                        className="border border-gray-200 rounded-md p-1" />
                         {error?.password && <span className="text-red-500">{error.password}</span>}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="Confirm Password" className="font-bold">Confirm Password</label>
                    <input
                        name="confirmpassword"
                        type="password"
                        value={formData.confirmpassword}
                        onChange={changeInputHandler}
                        placeholder="Confirm Password"
                        className="border border-gray-200 rounded-md p-1" />
                         {error?.confirmpassword && <span className="text-red-500">{error.confirmpassword}</span>}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="Gender" className="font-bold">Gender</label>
                    <select name="gender" value={formData.gender} className="border border-gray-200 rounded-md p-1" onChange={changeInputHandler}>
                        <option value="male" className="p-1 bg-zinc-800">Male</option>
                        <option value="female" className="p-1 bg-zinc-800">Female</option>
                        <option value="other" className="p-1 bg-zinc-800">Other</option>
                    </select>
                    {error?.gender && <span className="text-red-500">{error.gender}</span>}
                </div>
                <button type="submit" className="bg-blue-600 text-white p-2 mt-2 rounded-md hover:bg-blue-900">Submit</button>
            </form>
        </div>
    )
}

export default UserForm