import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { getRecommendedUsers } from "../lib/api"; // you already have this in api.js
import {useTranslation} from "react-i18next"

const ChatListPage = () => {
    const {t} = useTranslation();
    const { authUser } = useAuthUser();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getRecommendedUsers();
                // exclude yourself from the list
                const filtered = data.filter((u) => u._id !== authUser?._id);
                setUsers(filtered);
            } catch (error) {
                console.error(t("ErrorFetchingUsers"), error);
            }
        };
        if (authUser) fetchUsers();
    }, [authUser , t]);

    return (
        <div className=" p-20 ">
            <h2 className="text-3xl  flex flex-col items-center font-bold mb-8">{t("PeopleYouMayKnow")}</h2>
            <ul className="space-y-6">
                {users.map((user) => (
                    <li key={user._id} className="max-w-4xl mx-auto">
                        <Link
                            to={`/chat/${user._id}`}
                            className="flex items-center  gap-3 p-5 bg-base-200 rounded-lg hover:bg-base-300 transition"
                        >
                            <img
                                src={user.profilePic || "/default-avatar.png"}
                                alt={user.fullName}
                                className="w-20 h-20 rounded-full"
                            />
                            <div>
                                <p className="font-semibold">{user.fullName}</p>
                                <p className="text-lg text-base-content/70">
                                  {t("InitiateConversation")}
                                </p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatListPage;

