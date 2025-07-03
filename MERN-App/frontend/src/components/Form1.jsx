import { useForm } from "react-hook-form";

const Form1 = () => {
    //Define requirements
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm();

    // Delay simulation 
    // const delay = (d) => {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve()
    //         }, d * 1000);
    //     })
    // }


    
    //Handle All Operations after submit here
    const onSubmit = async (data) => {
        // await delay(3); // simulate network delay

        try {
            const url = "http://localhost:3000/submit"; //makes a post request here `you see cannot /GET` here if get not defined
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            // Ensure response is OK (status 200-299)
            if (!response.ok) {
                throw new Error("Failed to submit form");
            }

            // Use r.json() safely
            // const result = await response.text();
            const result = await response.json();

            console.log("Server response:", result);

            //  Reset the form only if submission is successful
            reset();

        } catch (error) {
            console.error("Submission error:", error);
        }
    };
    

    return (
        <div className="relative min-h-screen bg-gray-100 flex items-center justify-center">
         
            {/* Use isSubmitting , Submitting animattion */}

            {/* {isSubmitting && (
                <div
                    className="absolute top-1/2 left-1/2  h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"
                    role="status"
                >
                    <span className="sr-only">Submitting...</span>
                </div>
            )} */}


            {/* Form box */}
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">User Login</h1>

                {/* Form  */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Username Section  */}
                    <div>

                        {/* 1  */}
                        <label htmlFor="username" className="block font-medium mb-1">
                            Username
                        </label>

                        {/* 2  */}
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            {...register("username", {
                                required: "Username is required",
                                minLength: { value: 4, message: "Min length is 4" },
                                maxLength: { value: 12, message: "Max length is 12" },
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        {/* 3  */}
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.username.message}
                            </p>
                        )}
                    </div>


                    {/* Password section  */}
                    <div>

                        {/* 1 */}
                        <label htmlFor="password" className="block font-medium mb-1">
                            Password
                        </label>

                        {/* 2  */}
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        {/* 3  */}
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <input
                            disabled={isSubmitting}
                            type="submit"
                            value="Submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer transition duration-200 disabled:opacity-50"
                        />
                    </div>

                    {/* custom errors defined using seterror  */}
                    {/* {errors.myform && <div className='red'>{errors.myform.message}</div>}
              {errors.blocked && <div className='red'>{errors.blocked.message}</div>} */}
                </form>
            </div>
        </div>
    );
}

export default Form1
