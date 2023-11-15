import { ICertificate } from "@/entities/Certificate/model/types/ICertificate";
import type { Meta, StoryObj } from "@storybook/react";
import { CertificateItem } from "./CertificateItem";

const meta = {
    title: "entities/Certificate/CertificateItem",
    component: CertificateItem,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof CertificateItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const certificate: ICertificate = {
    id: "1",
    number: "111",
    startDate: new Date(),
    group: "3",
    certificateType: {
        id: "1",
        value: "type",
        hasGroups: true,
    },
};

export const Primary: Story = {
    args: { certificate },
};
