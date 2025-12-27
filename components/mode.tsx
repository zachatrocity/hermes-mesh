import { Moon, Sun } from "lucide-react"

import { Button } from "./button"

export function ModeToggle() {
    const swap = () => {
        console.log('yo!')
        if (document.body.classList.contains('dark')) {
            document.body.classList.remove('dark');
        } else {
            document.body.classList.add('dark');
        }
    }

    return (
        <Button variant="outline" size="icon" onClick={swap}>
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
