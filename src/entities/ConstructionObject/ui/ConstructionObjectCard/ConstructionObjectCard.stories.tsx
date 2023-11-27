import { IConstructionObject } from "@/entities/ConstructionObject";
import type { Meta, StoryObj } from "@storybook/react";
import { ConstructionObjectCard } from "./ConstructionObjectCard";

const meta = {
    title: "entities/ConstructionObject/ConstructionObjectCard",
    component: ConstructionObjectCard,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof ConstructionObjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const constructionObject: IConstructionObject = {
    id: "1",
    name: "Туннель",
    address: "Москва, ул. Яблочкина, д.25",
    startDate: new Date(),
    endDate: new Date(),
    organization: { id: "1", name: "ООО 'ССТ-М'" },
};

export const Primary: Story = {
    args: { constructionObject },
};
