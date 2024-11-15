"use server"

import { SignUpForm, User } from "../app/page"
import { Role } from "../types/Role";

export const signup = async (formData : SignUpForm) => {

    console.log("this is executed on the server")

    let errors = {}

    const newUser : User = {
        role: formData.role,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
    }

    console.log("formdata", formData)
    if (formData.email === "") {
        errors = {...errors, email: "Email nesmie byť prázdny"}
    }  
    if (formData.password !== formData.password2) {
        errors = {...errors, password: "Heslá sa nezhodujú"}
    }

    if (formData.role === Role.masseur) {
        errors = {...errors, adminCode: "Zadaj administračný kód"}
    }

    console.log("errors", errors)
    if (Object.keys(errors)?.length > 0) {
        return {
            status: 400,
            data: {
                message: "Validation failed",
                errors
            }
        }
    }

    return {
        status: 200,
        data: {
            message: "User created successfully",
        }
    }
}