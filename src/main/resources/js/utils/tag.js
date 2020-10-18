export const onlyUniqueTag = (valueA,index, self) => {
    return self.findIndex((valueB) => valueA.tag === valueB.tag ) === index
}