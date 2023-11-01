import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import StoreProvider from "@/app/providers/StoreProvider/ui/StoreProvider";

const initialState: DeepPartial<StateSchema> = {
    user: {
        authenticatedUser: {
            id: "1",
            email: "sb@mail.ru",
            token: "TOKEN",
            avatar: "",
            birthDate: new Date(),
            surname: "Ivanov",
            name: "Ivan",
            patronymic: "Ivanovich",
        },
    },
};

export const StoreDecorator = (Story: any) => (
    <StoreProvider initialState={initialState as StateSchema}>
        {Story()}
    </StoreProvider>
);
