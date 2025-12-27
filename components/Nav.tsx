import { Button } from "./button";
import { Layers, MinusIcon, PlusIcon } from "lucide-react"
import {
    ButtonGroup,
} from "./button-group"
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ModeToggle } from "./mode";
import { MPwrd } from "./MPwrd";

export function Nav() {
    return <>
        {/* top nav */}
        <div className="absolute inset-x-0 top-0 p-2.5 z-1 flex flex-row justify-end">
            <Button variant="default" className="ml-auto dark:fill-inherit fill-(--meshtastic-color)">
                <MPwrd size={20}/>
            </Button>
        </div>
        {/* left nav */}
        <div className="absolute inset-y-0 left-0 p-2.5 z-1 flex flex-col justify-center">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="default" size="icon">
                        <Layers />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 z-1">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="leading-none font-medium">Dimensions</h4>
                            <p className="text-muted-foreground text-sm">
                                Set the dimensions for the layer.
                            </p>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
        {/* center nav */}
        <div className="absolute inset-x-0 bottom-0 p-2.5 z-1 flex flex-row justify-center">
            <ButtonGroup>
                <Button variant="default" size="icon">
                    <MinusIcon />
                </Button>
                <Button variant="default">Default</Button>
                <Button variant="default">Button</Button>
                <Button variant="default">Group</Button>
                <ModeToggle />
                <Button variant="default" size="icon">
                    <PlusIcon />
                </Button>
            </ButtonGroup>
        </div>
    </>
}