import React, { useState } from "react";
import { LanguagesIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signup } from "../lib/api.js"
import { useTranslation } from "react-i18next"

function SignUpPage() {
  const { t } = useTranslation();
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // signup mutation 
  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success(t());
      navigate("/")
    }
  });

  const handleSignup = (e) => {
    e.preventDefault();
    mutate(signupData);
  };


  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 font-[Poppins]"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #111827 50%, #000000 100%)",
      }}
    >
      <div className="border border-indigo-600/30 flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
        {/* SIGNUP FORM - LEFT SIDE */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col text-gray-200"
        >
          {/* LOGO - CENTERED */}
          <div className="mb-10 flex flex-col items-center justify-center">
            <div className="p-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
              <LanguagesIcon className="size-12 text-white" />
            </div>
            <span className="mt-3 text-4xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              {t("SpeakEasy")}
            </span>
          </div>

          {/*  ERROR MESSAGE HERE */}
          {
            error && (
              <div className="alert alert-error mb-4">
                <span>{error.response.data.message}</span>
              </div>
            )}
          <form onSubmit={handleSignup} className="w-full">
            <div className="space-y-7">
              {/* Heading */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white">
                  {t("CreateYourAccount")}
                </h2>
                <p className="text-lg text-gray-400 mt-2">
                  {t("BeginYourLanguagelearningJourneyToday")}
                </p>
              </div>

              {/* Full Name */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-lg font-medium text-gray-300">
                    {t("YourFullName")}
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 text-lg rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={signupData.fullName}
                  onChange={(e) =>
                    setSignupData({ ...signupData, fullName: e.target.value })
                  }
                  required
                />
              </div>

              {/* Email */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-lg font-medium text-gray-300">
                    {t("EmailAddress")}
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="johndoe@example.com"
                  className="input input-bordered w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 text-lg rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  required
                />
              </div>

              {/* Password */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-lg font-medium text-gray-300">
                    {t("password")}
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 text-lg rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  required
                />
                <p className="text-xl text-gray-400 mt-2">
                  {t("UseAtLeast8CharactersForYourPassword")}
                </p>
              </div>

              {/* Terms */}
              <div className="form-control w-full">
                <label className="label cursor-pointer items-start gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm bg-gray-800 border-gray-600"
                    required
                  />
                  <span className="text-lg leading-tight text-gray-400">
                    {t("Iagreetothe")}{" "}
                    <span className="text-indigo-400 hover:underline cursor-pointer">
                      {t("TermsOfService")}
                    </span>{" "}
                    {t(" And")}{" "}
                    <span className="text-indigo-400 hover:underline cursor-pointer">
                      {t("PrivacyPolicy")}
                    </span>
                    .
                  </span>
                </label>
              </div>

              {/* Button */}
              <button
                className="btn w-full py-3 text-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 rounded-lg"
                type="submit"
              >
                {isPending ? "Signing up..." : "Create Account"}
              </button>

              {/* Already have account */}
              <div className="text-center mt-4">
                <p className=" text-xl text-gray-400">
                  {t("AlreadyhaveAnaccount")}{" "}
                  <Link
                    to="/login"
                    className="text-indigo-400 hover:underline font-medium"
                  >
                    {t("SignIn")}

                  </Link>
                </p>
              </div>
            </div>
          </form>
        </motion.div>

        {/* SIGNUP INFO - RIGHT SIDE */}
        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="hidden lg:flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 w-1/2 p-10"
        >
          <div className="max-w-md mx-auto my-auto text-center">
            {/* Illustration */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-square max-w-sm mx-auto"
            >
              <img
                src="/i.png"
                alt=""
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </motion.div>

            {/* Info */}
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-semibold text-indigo-300">
                {t("ConnectWithLanguagePartnersBelowToStartPracticingTogether")}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                {t("PracticeConversationsBuildFriendshipsAndEnhanceYourLanguageSkillsInASupportiveGlobalCommunity")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SignUpPage;


// import React, { useState } from "react";
// import { ShipWheelIcon } from "lucide-react";
// import { Link } from "react-router";
// import { motion } from "framer-motion";

// function SignUpPage() {
//   const [signupData, setSignupData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//   });

//   const handleSignup = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div
//       className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
//       data-theme="forest"
//     >
//       <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-2xl shadow-xl overflow-hidden">
//         {/* SIGNUP FORM - LEFT SIDE */}
//         <motion.div
//           initial={{ x: -80, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col"
//         >
//           {/* LOGO */}
//           <div className="mb-6 flex items-center gap-2">
//             <ShipWheelIcon className="size-10 text-primary" />
//             <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wide">
//              SpeakEasy
//             </span>
//           </div>

//           <form onSubmit={handleSignup} className="w-full">
//             <div className="space-y-6">
//               {/* Heading */}
//               <div>
//                 <h2 className="text-2xl font-semibold">Create an Account</h2>
//                 <p className="text-sm opacity-70 mt-1">
//                   Begin your language-learning journey today!
//                 </p>
//               </div>

//               {/* Full Name */}
//               <div className="form-control w-full">
//                 <label className="label">
//                   <span className="label-text font-medium">Full Name</span>
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="John Doe"
//                   className="input input-bordered w-full"
//                   value={signupData.fullName}
//                   onChange={(e) =>
//                     setSignupData({ ...signupData, fullName: e.target.value })
//                   }
//                   required
//                 />
//               </div>

//               {/* Email */}
//               <div className="form-control w-full">
//                 <label className="label">
//                   <span className="label-text font-medium">Email Address</span>
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="johndoe@example.com"
//                   className="input input-bordered w-full"
//                   value={signupData.email}
//                   onChange={(e) =>
//                     setSignupData({ ...signupData, email: e.target.value })
//                   }
//                   required
//                 />
//               </div>

//               {/* Password */}
//               <div className="form-control w-full">
//                 <label className="label">
//                   <span className="label-text font-medium">Password</span>
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="••••••••"
//                   className="input input-bordered w-full"
//                   value={signupData.password}
//                   onChange={(e) =>
//                     setSignupData({ ...signupData, password: e.target.value })
//                   }
//                   required
//                 />
//                 <p className="text-xs opacity-70 mt-2">
//                   Must be at least 8 characters long.
//                 </p>
//               </div>

//               {/* Terms */}
//               <div className="form-control w-full">
//                 <label className="label cursor-pointer items-start gap-2">
//                   <input type="checkbox" className="checkbox checkbox-sm" required />
//                   <span className="text-xs leading-tight">
//                     I agree to the{" "}
//                     <span className="text-primary hover:underline cursor-pointer">
//                       Terms of Service
//                     </span>{" "}
//                     and{" "}
//                     <span className="text-primary hover:underline cursor-pointer">
//                       Privacy Policy
//                     </span>
//                     .
//                   </span>
//                 </label>
//               </div>

//               {/* Button */}
//               <button className="btn btn-primary w-full" type="submit">
//                 Create Account
//               </button>

//               {/* Already have account */}
//               <div className="text-center mt-4">
//                 <p className="text-sm">
//                   Already have an account?{" "}
//                   <Link to="/login" className="text-primary hover:underline">
//                     Sign In
//                   </Link>
//                 </p>
//               </div>
//             </div>
//           </form>
//         </motion.div>

//         {/* SIGNUP INFO - RIGHT SIDE */}
//         <div className="hidden lg:flex flex-col bg-gradient-to-br from-base-200 via-base-300 to-base-200 w-1/2 p-8">
//           <div className="max-w-md mx-auto my-auto text-center">
//             {/* Illustration */}
//             <div className="relative aspect-square max-w-sm mx-auto">
//               <img
//                 src="/i.png"
//                 alt="Language connection illustration"
//                 className="w-full h-full object-contain"
//               />
//             </div>

//             {/* Info */}
//             <div className="mt-6 space-y-3">
//               <h2 className="text-xl font-semibold">
//                 Connect with Language Partners Worldwide
//               </h2>
//               <p className="opacity-70 leading-relaxed">
//                 Practice conversations, build friendships, and enhance your
//                 language skills together in a supportive community.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUpPage;



// import React from 'react'
// import { useState } from 'react'
// import { ShipWheelIcon } from "lucide-react"
// import { Link } from 'react-router';


// function SignUpPage() {

//   const [signupData, setSignupData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//   });

//   const handleSignup = (e) => {
//     e.preventDefault();
//   }

//   return (
//     <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest" >
//       <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
//         {/* SIGNUP FORM - LEFT SIDE  */}
//         <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
//           {/* LOGO */}
//           <div className='mb-4 flex items-center justify-start gap-2'>
//             <ShipWheelIcon className='size-9 text-primary' />
//             <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
//               Streamfiy
//             </span>
//           </div>
//           <div className='w-full'>
//             <form onSubmit={handleSignup}>
//               <div className='space-y-4'>
//                 <div>
//                   <h2 className='text-xl font-semibold'>Create an Acount</h2>
//                   <p className='text-sm opacity-70'>
//                     Start your Language Learning Adventure here !!
//                   </p>
//                 </div>

//                 <div className='space-y-3'>
//                   <div className='from-control w-full'>
//                     <label className='label'>
//                       <span className='label-text'>Full Name </span>
//                     </label>
//                     <input type='text'
//                       placeholder='John Doe'
//                       className='input input-bordered w-full'
//                       value={signupData.fullName}
//                       onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
//                       required
//                     />

//                   </div>
//                   {/*  email */}
//                   <div className='from-control w-full'>
//                     <label className='label'>
//                       <span className='label-text'>Email </span>
//                     </label>
//                     <input type='email'
//                       placeholder='JohnDoe@gmail.com'
//                       className='input input-bordered w-full'
//                       value={signupData.email}
//                       onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
//                       required
//                     />
//                   </div>
//                   {/* password  */}
//                   <div className='from-control w-full'>
//                     <label className='label'>
//                       <span className='label-text'>password</span>
//                     </label>
//                     <input type='password'
//                       placeholder='**********'
//                       className='input input-bordered w-full'
//                       value={signupData.password}
//                       onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
//                       required
//                     />
//                     <p className='text-xs opacity-70 mt-1'>
//                       Password must be atleast 8 character long
//                     </p>
//                   </div>

//                   <div className='from-control w-full'>
//                     <label className='label cursor-pointer justify-start gap-2'>
//                       <input type='checkbox' className='checkbox checkbox-sm required ' />
//                       <span className='text-xs leading-tight'>
//                         I agree to the {" "}
//                         <span className='text-primary hover:underline'>terms of services</span>
//                         <span className='text-primary hover:underline'>privacy police</span>
//                       </span>
//                     </label>
//                   </div>
//                 </div>
//                 <button className='btn btn-primary w-full' type='submit'>
//                   Create Account
//                 </button>

//                 <div className='text-center mt-4'>
//                   <p className='text-sm'>
//                     Already have an Account?{" "}
//                     <Link to="/login" className="text-primary hover:underline" >
//                       Sign In
//                     </Link>
//                   </p>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* SIGNUP FORM - RIGHT SIDE  */}
//         <div className='hidden lg:flex flex-col bg-base-200 w-1/2 p-4 sm:p-8' >
//            <div className='max-w-md p-8'>
//             {/* Illustration */}
//              <div className='relative aspect-square max-w-sm max-auto'>
//                <img src='/i.png' alt='Language connection illustration' className='w-full h-full'/>
//              </div>

//              <div className='text-center space-y-3 mt-6'>
//                  <h2>Connect with Language partners worldwide</h2>
//                  <p className='opacity-70'>
//                     Practice conversation , make friends aand improve your Language skills togeather
//                  </p>
//              </div>
//            </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SignUpPage;


