import { PartialType } from "@nestjs/mapped-types"
import { CreateCoffeeDto } from "./create-coffee.dto"

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto){

}

// PartialType adds @Optional decorator before each property