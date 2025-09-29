import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router-dom";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";
import { capitalize } from "../lib/utils";
import { getLanguageFlag } from "../lib/getLanguageFlagg";
import FriendCard from "../components/FriendsCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="p-4 sm:p-6  pl-3 mt-16  lg:p-8">
      <div className="container mx-auto  space-y-4 pl-20 sm:pl-24 lg:pl-28 pr-4 sm:pr-8 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
          <Link to="/notification" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Meet New Learners</h2>
                <p className="opacity-70">
                  Discover perfect language exchange partners based on your profile
                </p>
              </div>
            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
              <p className="text-base-content opacity-70">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                //console.log("Recommended Users:", recommendedUsers);
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="card bg-base-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="card-body p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar size-16 rounded-full">
                          <img src={user.profilePic} alt={user.fullName} />
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg">{user.fullName}</h3>
                          {user.location && (
                            <div className="flex items-center text-xs opacity-70 mt-1">
                              <MapPinIcon className="size-3 mr-1" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Languages with flags */}
                      <div className="flex flex-wrap gap-1.5">
                        <span className="badge badge-secondary">
                          {getLanguageFlag(user.nativeLanguage)}
                          Native: {capitalize(user.nativeLanguage)}
                        </span>
                       <span className="badge badge-outline">
                          {getLanguageFlag(user.learningLanguage)}
                          Learning: {capitalize(user.learningLanguage)}
                        </span>
                      </div>

                      {user.bio && <p className="text-sm opacity-70">{user.bio}</p>}

                      {/* Action button */}
                      <button
                        className={`btn w-full mt-2 ${hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                          } `}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                        console.log(hasRequestBeenSent),
                          <>
                            <CheckCircleIcon className="size-4 mr-2" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4 mr-2" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;



// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import React, { useEffect, useState } from 'react'
// import { Link } from "react-router-dom"
// import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";
// import FriendCard from "../components/FriendsCard"
// import NoFriendsFound from "../components/NoFriendsFound.jsx"

// import {
//   getOutgoingFriendReqs,
//   getRecommendedUsers,
//   getUserFriends,
//   sendFriendRequest
// } from '../lib/api';
// import { useThemeStore } from '../store/useThemeStore.js';

// function capitialize(str = "") {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }

// function HomePage() {

//   const {theme} = useThemeStore();
//   const queryClient = useQueryClient();
//   const [outgoingRequestIds, setOutgoingRequestIds] = useState(new Set());

//   const { data: friends = [], isLoading: loadingFriends } = useQuery({
//     queryKey: ["friends"],
//     queryFn: getUserFriends,
//   });

//   const { data: recommendedUser = [], isLoading: loadingUser } = useQuery({
//     queryKey: ["users"],
//     queryFn: getRecommendedUsers,
//   });

//   const { data: outgoingFriendReqs } = useQuery({
//     queryKey: ["outgoingFriendReqs"],
//     queryFn: getOutgoingFriendReqs,
//   });

//   const { mutate: sendRequestMutation, isPending } = useMutation({
//     mutationFn: sendFriendRequest,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] })
//   });

//   useEffect(() => {
//     const outgoingIds = new Set();
//     if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
//       outgoingFriendReqs.forEach((req) => {
//         outgoingIds.add(req.id);
//       });
//       setOutgoingRequestIds(outgoingIds);
//     }
//   }, [outgoingFriendReqs]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white transition-all" data-theme={theme}>
//       <div className="pl-20 sm:pl-24 lg:pl-28 pr-4 sm:pr-8 py-6">
//         <div className="max-w-7xl mx-auto space-y-12">

//           {/* Friends Section */}
//           <div>
//             <div className="flex flex-col sm:flex-row items-start sm:items-center mt-16 justify-between gap-4 mb-6">
//               <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
//               <Link
//                 to="/notifications"
//                 className="flex items-center gap-2 px-4 py-2 border rounded-xl text-sm hover:bg-gray-800 transition"
//               >
//                 <UsersIcon className="size-4" />
//                 Friend Requests
//               </Link>
//             </div>

//             {loadingFriends ? (
//               <div className="flex justify-center py-12">
//                 <span className="loading loading-spinner loading-lg" />
//               </div>
//             ) : friends.length === 0 ? (
//               <NoFriendsFound />
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {friends.map((friend) => (
//                   <FriendCard key={friend._id} friend={friend} />
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Recommended Users Section */}
//           <section>
//             <div className="mb-6" data-theme = >
//               <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Meet New Learners</h2>
//               <p className="opacity-70 mt-1">
//                 Connect with learners who share your passion for languages              </p>
//             </div>

//             {loadingUser ? (
//               <div className="flex justify-center py-12">
//                 <span className="loading loading-spinner loading-lg" />
//               </div>
//             ) : recommendedUser.length === 0 ? (
//               <div className="card bg-gray-800/60 backdrop-blur-md p-6 text-center rounded-2xl shadow-md">
//                 <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
//                 <p className="text-sm opacity-70">Stay tuned! More partners will be available shortly!</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {recommendedUser.map((user) => {
//                   const hasRequestBeenSent = outgoingRequestIds.has(user._id);

//                   return (
//                     <div
//                       key={user._id}
//                       className="card bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-lg p-6 transition transform hover:scale-[1.02] hover:shadow-2xl"
//                     >
//                       <div className="flex items-center gap-4 mb-4">
//                         <div className="w-16 h-16 rounded-full overflow-hidden">
//                           <img
//                             src={user.profilePic}
//                             alt={user.fullName}
//                             className="object-cover w-full h-full"
//                           />
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-lg">{user.fullName}</h3>
//                           {user.location && (
//                             <div className="flex items-center text-xs opacity-70 mt-1">
//                               <MapPinIcon className="size-3 mr-1" />
//                               {user.location}
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       {/* Languages */}
//                       <div className="flex flex-wrap gap-2 mb-3">
//                         <span className="badge bg-blue-500/20 border border-blue-400 text-blue-300">
//                           {getLanguageFlag(user.nativeLanguage)}
//                           Native: {capitialize(user.nativeLanguage)}
//                         </span>
//                         <span className="badge bg-green-500/20 border border-green-400 text-green-300">
//                           {getLanguageFlag(user.learningLanguage)}
//                           Learning: {capitialize(user.learningLanguage)}
//                         </span>
//                       </div>

//                       {user.bio && (
//                         <p className="text-sm opacity-70 mb-4">{user.bio}</p>
//                       )}

//                       <button
//                         className={`w-full py-2 rounded-xl transition ${hasRequestBeenSent
//                             ? "bg-gray-700 cursor-not-allowed text-gray-400"
//                             : "bg-blue-600 hover:bg-blue-700 text-white"
//                           }`}
//                         onClick={() => sendRequestMutation(user._id)}
//                         disabled={hasRequestBeenSent || isPending}
//                       >
//                         {hasRequestBeenSent ? (
//                           <div className="flex items-center justify-center gap-2">
//                             <CheckCircleIcon className="size-4" />
//                             Request Sent
//                           </div>
//                         ) : (
//                           <div className="flex items-center justify-center gap-2">
//                             <UserPlusIcon className="size-4" />
//                             Send Friend Request
//                           </div>
//                         )}
//                       </button>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;
