import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle 
} from "../ui/dialog";
import { modalStore } from "@/store/modal-store";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function PostModal() {
    const { isOpen, onClose, type } = modalStore();
    const router = useRouter();

    const isModalOpen = isOpen && type === "post";

    const onClick = (values : string) => {
        if(values === "ai") {
            router.push("/writer/ai");
        }

        else if(values === "direct") {
            router.push("/writer/direct");
        }
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        어떤 글을 쓰시겠습니까?
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Ai에게 요청하시겠습니까? 아니면 직접 쓰시겠습니까?
                    </DialogDescription>
                </DialogHeader>
                
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button
                            onClick={()=>onClick("ai")}
                            variant="primary"
                        >
                            Ai
                        </Button>
                        <Button
                            onClick={()=>onClick("direct")}
                            variant="primary"
                        >
                            Direct
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}