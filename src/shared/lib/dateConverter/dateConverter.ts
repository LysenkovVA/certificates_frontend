export class DateConverter {
    static toString(date: Date | undefined) {
        if (!date) {
            return "";
        }

        return date.toLocaleDateString("ru-RU", { dateStyle: "short" });
    }
}
