import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { Globe, LoaderIcon, MapPinIcon, ShipWheelIcon, UserPen } from "lucide-react";
import { LANGUAGES } from "../constants";
import { CameraIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"

function OnboardingPage() {

  const { t } = useTranslation();
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    NativeLanguage: authUser?.NativeLanguage || "",
    LearningLanguage: authUser?.LearningLanguage || "",
    location: authUser?.location || "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: async () => {
      toast.success("Profile Onboarded Successfully !!");
      await queryClient.invalidateQueries({ queryKey: ["authUser"] })
      queryClient.setQueryData(["authUser"], (old) => ({
        ...old,
        ...profile,
        isOnboarded: true,
      }))
      navigate("/");

    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(profile);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setProfile({ ...profile, profilePic: randomAvatar });
    toast.success(t("RandomProfilePictureGenerated"));
  }

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">{t("CompleteYourProfile")}</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* IMAGE PREVIEW */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {profile.profilePic ? (
                  <img
                    src={profile.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              {/* Generate Random Avatar BTN */}
              <div className="flex items-center gap-2">
                <button type="button" onClick={handleRandomAvatar} className="btn btn-accent">
                  <UserPen className="size-4 mr-2" />
                  {t("GenerateRandomAvatar")}
                </button>
              </div>
            </div>

            {/* FULL NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">{t("FullName")}</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="input input-bordered w-full"
                placeholder={t("YourFullName")}
              />
            </div>

            {/* BIO */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="textarea textarea-bordered h-24"
                placeholder={t("TellOthersAboutYourselfAndYourLanguageLearningGoals")}
              />
            </div>

            {/* LANGUAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* NATIVE LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">{t("NativeLanguage")}</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={profile.NativeLanguage}
                  onChange={(e) => setProfile({ ...profile, NativeLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">{t("SelectYourNativeLanguage")}</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* LEARNING LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">{t("LearningLanguage")}</span>
                </label>
                <select
                  name="learningLanguage"
                  value={profile.LearningLanguage}
                  onChange={(e) => setProfile({ ...profile, LearningLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">{t("SelectLanguageYoureLearning")}</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">{t("Location")}</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}

            <button className="btn btn-primary w-full" disabled={isPending} type="submit">
              {!isPending ? (
                <>
                  <Globe className="size-5 mr-2" />
                  {t("CompleteOnboarding")}
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  {(" Onboarding")}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;

