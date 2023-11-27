import { ICertificate } from "@/entities/Certificate/model/types/ICertificate";
import type { Meta, StoryObj } from "@storybook/react";
import dayjs from "dayjs";
import { CertificateCard } from "./CertificateCard";

const meta = {
    title: "entities/Certificate/CertificateCard",
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
    number: "123456",
    startDate: dayjs("10.03.2023", "DD.MM.YYYY").toDate(),
    group: "3",
    certificateType: {
        id: "1",
        value: "Охрана труда",
        hasGroups: true,
    },
    scans: [],
    protocols: [],
};

export const Primary: Story = {
    args: { certificate },
};
