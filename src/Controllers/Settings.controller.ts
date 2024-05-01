import mongoose from "mongoose";
import { Body, Controller, Get, HttpException, Param, Post } from "@nestjs/common";
import { User } from "../Schema/User.Schema";
import { UserService } from "../uses-case/User";
import { Public } from "src/Custom Decorators/public.decorator";
import { SettingsService } from "src/uses-case/Settings/settings.service";

@Controller('settings')
export class SettingsController {
    constructor(
        private userSettings: SettingsService
    ) { }

    @Public()
    @Get(':id')
    async GetUserById(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('user not found', 404);
        const findSettings = await this.userSettings.findOneSetting(id);
        if (!findSettings) {
            throw new HttpException('user not foundt', 404);
        }
        return findSettings;
    }


}
