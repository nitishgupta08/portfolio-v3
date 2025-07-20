import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <Badge variant="outline" className="text-sm font-medium uppercase tracking-wider">
            Gallery
          </Badge>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Coming Soon
            </h1>
            <p className="text-xl text-muted-foreground">
              I'm working on creating an amazing photo gallery experience. 
              Check back soon to see my photography work!
            </p>
          </div>

          <div className="pt-8">
            <Button asChild variant="outline">
              <Link href="/">
                <FaArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
