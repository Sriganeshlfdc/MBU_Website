<footer>
        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-title">Contact Us</div>
                <div class="content">
                    <h1>Montfort Brothers of St. Gabriel</h1>
                    <p>
                    Uganda Mission<br>
                    Entebbe, Uganda<br>
                    Email<br>
                    Phonenumber<br>
                    </p>
                </div>    
            </div>
            <div class="footer-content">
                <div class="footer-title">About us</div>
                <div class="links">
                    <ul>
                        <li><a href="about.php#vision">Our Vision</a></li>
                        <li><a href="about.php#heritage">Our Heritage</a></li>
                        <li><a href="about.php#uganda_mission">Uganda Mission</a></li>
                        <li><a href="about.php#aim">Our Aim</a></li>
                        <li><a href="about.php#characters">Characteristics</a></li>
                    </ul>
                </div>
                <div class="footer-title">Where we are</div>
                <div class="links">
                    <ul>
                        <li><a href="location.php#mpala-section" class="location-navigation">Entebbe - Mpala</a></li>
                        <li><a href="location.php#kyebando-section" class="location-navigation">Jinja - Kyebando</a></li>
                        <li><a href="location.php#isunga-section" class="location-navigation"> Fort Portal - Isunga</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-content">
                <div class="footer-title">Quick Links</div>
                <div class="links">
                    <ul>
                        <li><a href="index.php#galleryContainer">Gallery</li>
                        <li><a href="unite.php">Unite</a></li>
                        <li><a href="index.php#">Privacy</a></li>
                    </ul>
                </div>
                
            </div>
            <div class="footer-content">
                <div class="footer-title">Scholarships for Students</div>
                <div class="links">
                    <ul>
                        <li><a href="#" class="open-donate-popup">Sponsor a Student</a></li>
                        <li><a href="#" class="open-donate-popup">Stationery</a></li>
                        <li><a href="#" class="open-donate-popup">Equipment</a></li>
                        <li><a href="#" class="open-donate-popup">Infrastructure development</a></li>
                        <li><a href="#" class="open-donate-popup">Community Empowerment</a></li>
                    </ul>
                </div>
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
                <div class="caption"><p>Send us an email expressing intent to join our mission.</p></div>
                <div class="contact-form">
                    <form action="api/contact_process.php" method="POST">
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
                    <label for="email">Email : email</label>
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