import React from "react";

const Certificate = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-10 max-w mx-auto">
            <h1 className="text-xl font-bold text-gray-900 mb-4">
                Please complete the course to view your certificate
            </h1>
            <div className="border-t border-gray-300 pt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    🎓 Certificate Details
                </h2>
                <p>🔹 <strong>Certificate ID:</strong> #123456789ABCDEF</p>
                <p>🔹 <strong>Issued To:</strong> Nguyen Van A</p>
                <p>🔹 <strong>Course:</strong> Blockchain Development with Cardano</p>
                <p>🔹 <strong>Issuer:</strong> LMS Blockchain Academy</p>
                <p>🔹 <strong>Date Issued:</strong> February 16, 2025</p>
                <p>🔹 <strong>Status:</strong> ✅ Verified on Cardano Blockchain</p>
                <p>
                    🔹 <strong>Blockchain Transaction:</strong> 
                    <a href="#" className="text-blue-600 hover:underline"> View on Explorer</a>
                </p>
                <p>
                    🔹 <strong>Download PDF:</strong> 
                    <a href="#" className="text-blue-600 hover:underline"> Download Here</a>
                </p>
            </div>
        </div>
    );
};

export default Certificate;
