import { Link } from "react-router-dom";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

export default function Home() {

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="d-flex gap-4">
          <Link to="/professor" className="text-decoration-none text-center">
            <div className="btn btn-outline-primary d-flex flex-column align-items-center p-4">
              <FaChalkboardTeacher size={32} className="mb-2" />
              <span>Professor</span>
            </div>
          </Link>

          <Link to="/aluno" className="text-decoration-none text-center">
            <div className="btn btn-outline-success d-flex flex-column align-items-center p-4">
              <FaUserGraduate size={32} className="mb-2" />
              <span>Aluno</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}