import z from 'zod';

export const userFormSchema = z.object({
    name: z.string().min(2, {message: "Name must be at least 2 characters long"}),

    email: z.string().email("Invalid Email"),

    age: z.number().min(13, {message: "Age must be at least 13"}),

    phone: z.string().min(10, "Phone Number has minimum 10 digits").max(10, "Phone number has Maximum 10 digits"),

    password: z.string().min(4, "Password must be at least 4 characters long").regex(/[0-9]/, "Password must Contain a Number").regex(/[a-z]/, "Password must contain an Alphabates"),

    confirmpassword: z.string().min(4, "Password must be at least 4 characters long").regex(/[0-9]/, "Password must Contain a Number").regex(/[a-z]/, "Password must contain an Alphabates"),

    gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({
            message: 'Gender is required'
        })
    })
}).refine(data => data.password === data.confirmpassword, {
    message: "Passwords don't match",
    path: ["confirmpassword"]  // Show this error on the confirmpassword field
})


// We got a Types of userFormSchema in userForm
// We dont have to define types seperately, Zod has feature to infer types
export type userForm = z.infer<typeof userFormSchema>  

//For Form error
// Partial = not all field has error, if any one field has error then it will work
export type formErrors = Partial<Record<keyof userForm, String[]>>