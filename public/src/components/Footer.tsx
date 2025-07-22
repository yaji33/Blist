const Footer = () => {
  return (
    <footer className="w-full border-t border-[#DCDCDC] mt-12 py-6 bg-white">
      <div className="container mx-auto px-4 flex items-center justify-center text-sm text-gray-500">
        <p className="text-center flex items-center gap-2 flex-wrap justify-center">
          <span>Built with</span>
          <span className="text-[#F8D347] text-base">♥</span>
          <span>by</span>
          <a
            href="https://x.com/Yaji_33"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F8D347] hover:text-[#F8D347]/80 transition-colors underline decoration-dotted underline-offset-4"
          >
            @Yaji_33
          </a>
          <span>|</span>
          <span>Powered by</span>
          <a
            href="https://bless.network/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F8D347] hover:text-[#F8D347]/80 transition-colors underline decoration-dotted underline-offset-4"
          >
            bless.network
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
