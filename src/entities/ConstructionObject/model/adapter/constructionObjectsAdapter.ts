import { IConstructionObject } from "@/entities/ConstructionObject";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const constructionObjectsAdapter =
    createEntityAdapter<IConstructionObject>({
        selectId: (constructionObject) => constructionObject.id,
    });
