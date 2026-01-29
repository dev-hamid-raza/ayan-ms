import { Dispatch, ReactNode } from 'react'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'

interface PrimarySheetSidebarProps {
    title: string
    open: boolean
    onOpenChange: Dispatch<boolean>
    loading: boolean
    onSubmit: () => void
    children: ReactNode
}

function PrimarySheetSidebar({title, loading, onSubmit, children, open, onOpenChange}:PrimarySheetSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} >
            {/* <SheetTrigger asChild>
                <Button variant="outline">Create User</Button>
            </SheetTrigger> */}

            <SheetContent>
                <SheetHeader className="border-b">
                    <SheetTitle>{title}</SheetTitle>
                </SheetHeader>

                    {children}

                    <SheetFooter className="border-t">
                        <Button onClick={() => onSubmit()}>{loading ? <Spinner /> : "Save changes"}</Button>

                        <SheetClose asChild>
                            <Button type="button" variant="outline">
                                Close
                            </Button>
                        </SheetClose>
                    </SheetFooter>
            </SheetContent>
        </Sheet>
  )
}

export default PrimarySheetSidebar
