const TermAndConditionsModal = () => {
    return (
        <> 
            <div className="scroll-auto">
                <h1 className="flex justify-center text-3xl font-bold">Nimbus Airways</h1>
                <h1 className="flex justify-center text-3xl font-bold mb-4">Terms and Conditions</h1>
                
                <ol className="ml-4 list-decimal space-y-2">
                    <li className="text-lg font-bold">
                        <p>User Registration</p>
                        <ul className="ml-4 text-sm font-normal list-disc">
                            <li>Users must provide accurate and complete information during the registration process.</li>
                            <li>Users are responsible for maintaining the confidentiality of their account credentials and are liable for any activities conducted under their account.</li>
                        </ul>
                    </li>
                    <li className="text-lg font-bold">
                        <p>Booking and Payments</p>
                        <ul className="ml-4 text-sm font-normal list-disc">
                            <li>Flight bookings are subject to availability and acceptance by Nimbus Airways.</li>
                            <li>Users must provide accurate passenger information at the time of booking.</li>
                            <li>Payments for bookings must be made through authorized payment methods. Nimbus Airways ensures secure transactions, but users are advised to exercise caution and report any suspicious activities.</li>
                        </ul>
                    </li>
                    <li className="text-lg font-bold">
                        <p>Flight Information</p>
                        <ul className="ml-4 text-sm font-normal list-disc">
                            <li>Flight schedules, routes, and availability are subject to change. Nimbus Airways will make reasonable efforts to notify users of any changes in a timely manner.</li>
                        </ul>
                    </li>
                    <li className="text-lg font-bold">
                        <p>Cancellation and Refunds</p>
                        <ul className="ml-4 text-sm font-normal list-disc">
                            <li>Cancellation policies vary based on the type of ticket purchased. Users are encouraged to review the specific terms associated with their booking.</li>
                            <li>Refunds, if applicable, will be processed in accordance with our refund policy.</li>
                        </ul>
                    </li>
                    <li className="text-lg font-bold">
                        <p>Baggage and Security</p>
                        <ul className="ml-4 text-sm font-normal list-disc">
                            <li>Users are responsible for complying with baggage regulations and security procedures.</li>
                            <li>Nimbus Airways reserves the right to refuse carriage of items that pose a threat to the safety and security of the flight.</li>
                        </ul>
                    </li>
                    <li className="text-lg font-bold">
                        <p>Liability</p>
                        <ul className="ml-4 text-sm font-normal list-disc">
                            <li>Nimbus Airways is not liable for any loss, damage, or delay of baggage or personal belongings.</li>
                            <li>In no event shall Nimbus Airways be liable for any indirect, consequential, or incidental damages arising out of or in connection with our services.</li>
                        </ul>
                    </li>
                    <li className="text-lg font-bold">
                        <p>Changes to Terms and Conditions</p>
                        <ul className="ml-4 text-sm font-normal list-disc">
                            <li>Nimbus Airways reserves the right to modify these terms and conditions at any time. Users will be notified of significant changes, and continued use of our services constitutes acceptance of the revised terms.</li>
                        </ul>
                    </li>
                    <li className="text-lg font-bold">
                        <p>Termination of Services</p>
                        <ul className="ml-4 text-sm font-normal list-disc">
                            <li>Nimbus Airways reserves the right to terminate or suspend services to any user for violation of these terms and conditions or for any other reason deemed necessary.</li>
                        </ul>
                    </li>
                    <li className="text-lg font-bold">
                        <p>Don&apos;t take this seriously</p>
                        <ul className="ml-4 text-sm font-normal list-disc">
                            <li>This is just a sample. Don&apos;t take this seriously.</li>
                        </ul>
                    </li>
                </ol>
                <p className="text-sm mt-2">By using Nimbus Airways&apos; services, you acknowledge that you have read, understood, and agreed to these terms and conditions. If you have any questions or concerns, please contact our customer support. Safe travels with Nimbus Airways!</p>
                
            </div>
        </>
    )
}

export default TermAndConditionsModal