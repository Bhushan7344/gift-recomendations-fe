import { GiftIcon } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <GiftIcon className="h-6 w-6 text-purple-600" />
              <span className="text-lg font-semibold">GiftWise</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900">About</Link>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">Privacy</Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900">Terms</Link>
              <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900">Contact</Link>
            </div>
          </div>
          <div className="mt-4 text-center md:text-left">
            <p className="text-xs text-gray-400">© 2023 GiftWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
}

export default Footer;