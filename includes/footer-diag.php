<footer>
        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-title">Contact Us</div>
                <div class="content">
                    <h1>Montfort Brothers of St. Gabriel</h1>
                    <p>
                    Province of Pune - Uganda Mission
                    Entebbe, Uganda
                    contact@mbu.org
                    Phonenumber
                    </p>
                </div>    
            </div>
            <div class="footer-content">
                <div class="footer-title">Qucik Links</div>
                <div class="links">
                    <ul>
                        <li><a href="about.php#vision">Our Vision</a></li>
                        <li><a href="#heritage">Our Heritage</a></li>
                        <li><a href="#location">Where we are</a></li>
                        <li><a href="#galleryContainer">Gallery</a></li>
                        <li><a href="#privacy">Privacy Policy</a></li>
                </ul>
                </div>
            </div>
            <div class="footer-content">
                <div class="footer-title">Language</div>
                <select id="footer-lang-selector" onchange="setLanguage(this.value)">
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="it">Italion</option>
                    <option value="de">German</option>
                </select>
            </div>
            <div class="footer-content">
                <div class="footer-title">Stay Connected</div>
                <div class="caption"><p>Subscribe for updates on our mission and events.</p></div>
                <div class="contact-form">
                    <form action="../api/contact_process.php" method="POST">
                        <input type="text" name="name" placeholder="Your Name" required />
                        <input type="email" name="email" placeholder="Your Email" required />
                        <input type="text" name="number" placeholder="Phone number"  required />
                        <textarea name="message" rows="2" placeholder="Your Message"></textarea>
                        <div class="form-actions">
                            <button type="reset" class="btn subtle">Reset</button>
                            <button type="submit" class="btn primary">Send Message</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="copyrigts" style="padding:  8px 4px; opacity: 0.7;font-size: clamp(0.6rem,3vw,1rem);font-weight: 400;"><p>&copy; 2026 Montfort Brothers of St. Gabriel . All rights reserved.</p></div>
    </footer>
    <dialog id="donate-dialog" class="donate-popup animate-up">
        <div class="donate-window">
            <div class="donate-title">
                <h1>For donatation,Please contact below details</h1>
            </div>
            <div class="donate-form">
                <form>
                    <label for="email">Email : contact@mbu.org</label>
                    <label for="email">Phonenumber : Phonenumber</label>
                </form>
            </div>
            <button type="button" class="primary-fir" onclick="this.closest('dialog').close()">Close</button>
        </div>
    </dialog>
    <dialog id="success-dialog" class="donate-popup animate-up">
        <div class="donate-window">
            <div class="donate-title">
                <h1 style="color: #4CAF50;">Message Sent!</h1>
            </div>
            <div class="donate-form" style="text-align: center;">
                <p>Thank you for contacting us. We will get back to you shortly.</p>
            </div>
            <button type="button" class="primary-fir" onclick="this.closest('dialog').close()">Close</button>
        </div>
    </dialog>

    <dialog id="error-dialog" class="donate-popup animate-up">
        <div class="donate-window">
            <div class="donate-title">
                <h1 style="color: #dc3545;">Opps!</h1>
            </div>
            <div class="donate-form" style="text-align: center;">
                <p>Something went wrong. Please try again later.</p>
            </div>
            <button type="button" class="primary-fir" onclick="this.closest('dialog').close()">Close</button>
        </div>
    </dialog>