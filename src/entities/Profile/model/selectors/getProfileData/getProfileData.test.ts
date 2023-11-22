import { StateSchema } from "@/app/providers/StoreProvider";
import {getProfileData } from "@/entities/Profile/model/selectors/getProfileData/getProfileData";

describe("getProfileData.test", () => {
    test("Should return profile data", () => {
        const userProfile = {
            id: "1",
            email: "email@email.ru",
            token: "TOKEN",
        };
        const state: DeepPartial<StateSchema> = {
            profileSchema: {
                profileData: userProfile,
            },
        };
        expect(getProfileData(state as StateSchema)).toEqual(userProfile);
    });

    test("Should return empty object for empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileData(state as StateSchema)).toEqual({});
    });
});
