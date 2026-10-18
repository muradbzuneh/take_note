"use server"

import { auth } from "@/lib/auth"; // path to your Better Auth server instance

export const signInUser = async (email: string, password: string) => {
  try {
  await auth.api.signInEmail({
      body: {
          email,
          password
      },
      asResponse: true // returns a response object instead of data
  })
    
  return {success:true, massage:"signed in successfuly"}
}

  catch (error) {
    const e = error as Error;
    return {success: false, massage: e.message || "failed to sign in"}
  }
};

export const signUpUser = async (email: string, password: string, name:string) => {
  try {
  await auth.api.signUpEmail({
      body: {
          email,
      password,
          name
      },
      asResponse: true // returns a response object instead of data
  })
    
  return {
    success:true, massage:"signed in successfuly"
  }
}

  catch (error) {
    const e = error as Error;
    return {success: false, massage: e.message || "failed to sign in"}
  }
}; 

