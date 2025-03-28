export default function VnpayPayment() {
    return (
      <div className="p-4 border rounded-lg mt-4 bg-gray-100">
        <h3 className="text-lg font-semibold mb-2">Thanh toán qua VNPAY</h3>
        <p className="text-gray-600">Dùng QR Code hoặc ngân hàng nội địa để thanh toán.</p>
        
        <div className="flex justify-end mt-3">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg">
            Tiếp tục với VNPAY
            </button>
        </div>
      </div>
    );
  }
  