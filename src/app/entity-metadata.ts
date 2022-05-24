import { EntityDataModuleConfig, EntityMetadataMap } from "@ngrx/data";

const entityMetaData: EntityMetadataMap = {
    Post: {
        entityDispatcherOptions:{
            optimisticUpdate:true,
            optimisticAdd: true,
            optimisticDelete: true,
        }
    }, // première lettre obligatoirement MAJUSCYLE !
    User: {}
}

export const entityConfig: EntityDataModuleConfig = {
    entityMetadata: entityMetaData
}