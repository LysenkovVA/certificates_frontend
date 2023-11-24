import { ICertificate } from "@/entities/Certificate/model/types/ICertificate";
import type { Meta, StoryObj } from "@storybook/react";
import { CertificateCard } from "./CertificateCard";

const meta = {
    title: "entities/Certificate/CertificateItem",
    component: CertificateCard,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof CertificateCard>;

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
