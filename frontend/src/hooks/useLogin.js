// import React from 'react'
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import { login } from '../lib/api';

// function useLogin() {
//     const queryClient = useQueryClient();
//     const navigate = useNavigate();

//     const queryClient = useMutation({
//         mutationFn: login,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["authUser"] });
//             toast.success("Logged in successfully 🎉");
//             navigate("/");
//         },
//         onError: (err) => {
//             toast.error(err?.response?.data?.message || "Something went wrong");
//         },
//     });

// }

// export default useLogin


