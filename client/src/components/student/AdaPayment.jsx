/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react"; 
import { AppContext } from "../../context/AppContext";
import { NavLink,useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";
import { toast } from "react-toastify";


export default function AdaPayment({ courseData }) {
    const { currentWallet,userData,getToken ,backendUrl,changeUserOrCourseData,setChangeUserOrCourseData} = useContext(AppContext);
    const [balance, setBalance] = useState(0);
    const [course] = useState(courseData);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
      console.log("Current Wallet:", currentWallet);
        async function fetchBalance() {
          if (currentWallet) {
            try {
                const lovelace = await currentWallet.getLovelace();
                const as = parseFloat(lovelace) / 1000000;
              console.log("Số dư ví:", as); 
              setBalance(Number(as) || 0); 
            } catch (error) {
              console.error("Lỗi khi lấy số dư:", error);
            }
          }
        }
        fetchBalance();
      }, [currentWallet]);
      
      const coursePrice = (
        courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100
      ).toFixed(2);
    
      
      const handlePayment = async () => {
        if (!currentWallet) {
          toast.error("Vui lòng kết nối ví Cardano");
          return;
        }
        console.log("Thanh toán",userData._id,courseData._id,coursePrice);
         
        try {
            const utxos = await currentWallet.getUtxos();
            const changeAddress = await currentWallet.getChangeAddress();
            
            const getAddress =
            'addr_test1qq9qnzug66mn9fte8y8ycqgpfgvn6mce7an5cxaasrlp5xawyrhptr6ulqh8c477ga2sj5zs8kxzyxykgkkn9xq54jwqj3h4kd';
           
            const response = await axios.post("http://localhost:5000/api/course/payment", {
                    utxos: utxos,
                    changeAddress: changeAddress,
                    getAddress: getAddress,
                    courseId: course._id,
                    userId: userData._id,
                    value: coursePrice  * 1000000       
             });

            if(response.data.success){
                console.log(response.data.unsignedTx);
            }
    
            if (response.data.success) {
            const unsignedTx = response.data.unsignedTx;
            const signedTx = await currentWallet.signTx(unsignedTx);
            const txHash = await currentWallet.submitTx(signedTx);

            toast.success(`Thanh toan thành công! TX Hash: ${txHash}`);
                         return true;
            } else {
            toast.error("Thanh toan  thất bại!");
            return false;
            }
        } catch (error) {
            console.error("Lỗi khi mint NFT:", error);
            toast.error("Lỗi khi thanh toán!");
            return false;
        }
    }

    const enrollCourse = async () => {
        try {
            console.log("User Data:", userData);
    
            if (!userData) {
                return toast.error('Login to Enroll');
            }
    
            const token = await getToken();
            const { data } = await axios.post(`${backendUrl}/api/user/enroll-course`, {
                courseId: courseData._id,
                paymentMethod:"ADA Payment",
                currency :"ADA"
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            if (data.success) {
                toast.success("Tham gia khóa học thành công");
                
                if (data.session_url) {
                    window.location.replace(data.session_url);
                }
                return navigate("/");
            } else {
                toast.error(data.message);
                
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            
        }
    };
    

    const handleEnrollCourse = async () => {  
        setIsLoading(true);
        try {
            
            const paymentSuccess = await handlePayment();  
            if (paymentSuccess) {
                await enrollCourse();  
                setChangeUserOrCourseData(!changeUserOrCourseData);
            } else {
                toast.error("Thanh toán khóa học thất bại");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    

   
    return ( courseData ?
      <div className="p-4 border rounded-lg mt-4 bg-gray-100">
        <h3 className="text-lg font-semibold mb-2">Thanh toán bằng ADA</h3>
        <p className="text-gray-600">
          Giá khóa học: <span className="font-semibold text-green-600">{coursePrice} ADA</span>
        </p>
  
        {currentWallet ? (
          <p className="text-gray-600">
            Số dư ví: <span className="font-semibold text-blue-600">{balance} ADA</span>
          </p>
        ) : (
          <p className="text-red-500">Không tìm thấy ví, hãy liên kết ví để tiếp tục 
          <NavLink to="/my-profile" className="text-blue-600 underline font-semibold">tại đây</NavLink>
          </p>
        )}
  
       
  
        <div className="flex justify-end mt-3">
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              currentWallet && balance >= coursePrice 
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"

            }`}
            onClick={handleEnrollCourse}
            disabled={!currentWallet || balance < coursePrice || isLoading}
          >
            Tiếp tục với ADA
          </button>
        </div>
      </div> : <Loading />
    );
  }
  