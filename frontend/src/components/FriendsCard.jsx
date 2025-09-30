import React from 'react'
import { getLanguageFlag } from '../lib/getLanguageFlagg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function FriendsCard({friend}) {
   const {t} = useTranslation();
   
  return (
    <div className='card bg-base-200 hover:shadow-md translate-shadow'>
      <div className='card-body p-4'>
          {/* User Info */}
          <div className='flex items-center gap-3 mb-3'>
             <div className='avatar size-12'>
                <img src= {friend.profilePic} alt={friend.fullName}/>
             </div>
             <h3 className='font-semibold'>{friend.fullName}</h3>
          </div>

          {/* Actions */}
          <div className='flex flex-wrap gap-1.5 mb-3'>
             <span>
               {getLanguageFlag(friend.nativeLanguage)}
               Native : {friend.nativeLanguage}
             </span>
             <span>
              {getLanguageFlag(friend. learningLanguage)}
               Learning: {friend. learningLanguage}
             </span>
          </div>

          <Link to={`/chat/${friend._id}`} className='btn btn-outline w-full'>
             {t(" Message")}
          </Link>
      </div>
    </div>
  )
}

export default FriendsCard;



// export function getLanguageFlag(language) {
//   if (!language) return null;

//   const langLower = language.toLowerCase();
//   const countryCode = LANGUAGE_TO_FLAG[langLower];

//   if (countryCode) {
//     return (
//       <img
//         src={`https://flagcdn.com/24x18/${countryCode}.png`}
//         alt={`${langLower} flag`}
//         className="h-3 mr-1 inline-block"
//       />
//     );
//   }
//   return null;
// }
