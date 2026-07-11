import {BrainCog} from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <BrainCog className="h-10 w-10 text-primary" />
      <span className="text-2xl font-bold tracking-tight">
        LearnIQ
      </span>

    </div>
  );
}