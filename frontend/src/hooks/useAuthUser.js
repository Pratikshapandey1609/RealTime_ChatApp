import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false, // auth check
  });

  return { isLoading: authUser.isLoading, authUser: authUser.data?.user };
};
export default useAuthUser;


// import React from 'react'
// import { useQuery } from '@tanstack/react-query'
// import { getAuthUser } from '../lib/api'

// function useAuthUser() {
//     const {authUser , isLoading , refetch} = useQuery({
//     queryKey: ["authUser"],
//     queryFn: getAuthUser,
//     staleTime : 0,
//     retry : false,
//   })

//   return {isLoading : authUser.isLoading, authUser : authUser.data?.user , refetch};
// }

// export default useAuthUser

