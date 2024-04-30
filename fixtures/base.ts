import {test as base} from '@playwright/test'
import { m2d1_Assertions } from '../pages/Assertions/m2d1_Assertions'
import { m2d2_Assertions } from '../pages/Assertions/m2d2_Assertions'
import { m2d1_PageObjects } from '../pages/PageObjects/m2d1_PageObjects'
import { m2d3_Assertions } from '../pages/Assertions/m2d3_Assertions'

type MyFixtures={
    m2d1:m2d1_Assertions,
    m2d2:m2d2_Assertions,
    m2d3:m2d3_Assertions,
}

export const test=base.extend<MyFixtures>({
    m2d1:async({page},use)=>{
        await use(new m2d1_Assertions(page))
    },
    m2d2:async({page},use)=>{
        await use(new m2d2_Assertions(page))
    },
    m2d3:async({page},use)=>{
        await use(new m2d3_Assertions(page))
    },
})

export {expect} from '@playwright/test'