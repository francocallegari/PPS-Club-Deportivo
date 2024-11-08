import React, { useState } from 'react'
import RegisterForm from '../login/Register'
import { ProgressBar, Button, Form, Modal, Alert, Spinner } from 'react-bootstrap'
import RegisterPaymentStep from '../registerPaymentStep/RegisterPaymentStep'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import './RegisterPage.css'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
    const [step, setStep] = useState(1)
    const [progress, setProgress] = useState(0)
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()

    const goToNextStep = (data) => {
        if (step === 1) {
            setStep(2)
            setProgress(50)
            setUserData(data)
            console.log(data)
        }
    }

    const goToPreviousStep = () => {
        if (step === 2) {
            setStep(1)
            setProgress(0)
        }
    }

    const verifyResponse = (responseFromApi) => {

        if (responseFromApi == "OK") {
            console.log("Pago registrado con éxito")
            registerNewMember()
        }
    }

    const registerNewMember = async () => {
        try {
            const response = await fetch("https://localhost:7081/api/User/registerUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Usuario creado con éxito:", data)
                setProgress(100)
                setStep(3)
                setTimeout(() => {
                    navigate("/login")
                }, 3000)
            } else {
                console.error("Error al registrar usuario:", errorData);;
            }
        } catch (error) {
            console.error("Error de red o en la conexión:", error);
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {step == 1 && <RegisterForm checkForm={goToNextStep}></RegisterForm>}

            {step == 2 && (
                <div style={{ width: '1000px', marginBottom: '30px' }}>
                    <RegisterPaymentStep handleResponse={verifyResponse}></RegisterPaymentStep>
                    <button className='flex items-center previous-button' onClick={goToPreviousStep}>
                        <FaArrowLeft className='ml-2'></FaArrowLeft>
                        Anterior
                    </button>
                </div>
            )}

            {step == 3 && (
                <div className='stepThreeDiv'>
                    <Alert variant='success'>¡Registro exitoso!</Alert>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <p>Redirigiendo a Inicio de Sesión</p>
                        <Spinner animation="border" variant="secondary"></Spinner>
                    </div>

                </div>
            )}

            <div className="progressBar mb-5" style={{ width: "700px" }}>
                <ProgressBar now={progress}></ProgressBar>
            </div>
        </div>
    )
}

export default RegisterPage