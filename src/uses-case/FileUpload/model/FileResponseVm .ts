import { ApiProperty } from "@nestjs/swagger";
import { FileInfoVm } from "./FileInfoVm ";

export class FileResponseVm {
    @ApiProperty() message: string;

    @ApiProperty({ type: FileInfoVm })
    file: FileInfoVm;
}