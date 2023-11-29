import type { Meta, StoryObj } from "@storybook/react";
import { CertificatesList } from "./CertificatesList";

const meta = {
    title: "features/Certificates/CertificatesList",
    component: CertificatesList,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof CertificatesList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
