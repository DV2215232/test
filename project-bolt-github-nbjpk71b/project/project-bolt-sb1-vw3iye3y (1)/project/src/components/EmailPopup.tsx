import React, { useState } from 'react';
import { X, Mail, User, Phone, Download, Shield, CheckCircle, ChevronDown } from 'lucide-react';
import { createLandingPageEntry, checkEmailExists } from '../lib/supabase';

interface EmailPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// Comprehensive country codes data for all countries
const countryCodes = [
  { code: '+93', country: 'AF', flag: '🇦🇫', name: 'Afghanistan' },
  { code: '+355', country: 'AL', flag: '🇦🇱', name: 'Albania' },
  { code: '+213', country: 'DZ', flag: '🇩🇿', name: 'Algeria' },
  { code: '+1684', country: 'AS', flag: '🇦🇸', name: 'American Samoa' },
  { code: '+376', country: 'AD', flag: '🇦🇩', name: 'Andorra' },
  { code: '+244', country: 'AO', flag: '🇦🇴', name: 'Angola' },
  { code: '+1264', country: 'AI', flag: '🇦🇮', name: 'Anguilla' },
  { code: '+672', country: 'AQ', flag: '🇦🇶', name: 'Antarctica' },
  { code: '+1268', country: 'AG', flag: '🇦🇬', name: 'Antigua and Barbuda' },
  { code: '+54', country: 'AR', flag: '🇦🇷', name: 'Argentina' },
  { code: '+374', country: 'AM', flag: '🇦🇲', name: 'Armenia' },
  { code: '+297', country: 'AW', flag: '🇦🇼', name: 'Aruba' },
  { code: '+61', country: 'AU', flag: '🇦🇺', name: 'Australia' },
  { code: '+43', country: 'AT', flag: '🇦🇹', name: 'Austria' },
  { code: '+994', country: 'AZ', flag: '🇦🇿', name: 'Azerbaijan' },
  { code: '+1242', country: 'BS', flag: '🇧🇸', name: 'Bahamas' },
  { code: '+973', country: 'BH', flag: '🇧🇭', name: 'Bahrain' },
  { code: '+880', country: 'BD', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+1246', country: 'BB', flag: '🇧🇧', name: 'Barbados' },
  { code: '+375', country: 'BY', flag: '🇧🇾', name: 'Belarus' },
  { code: '+32', country: 'BE', flag: '🇧🇪', name: 'Belgium' },
  { code: '+501', country: 'BZ', flag: '🇧🇿', name: 'Belize' },
  { code: '+229', country: 'BJ', flag: '🇧🇯', name: 'Benin' },
  { code: '+1441', country: 'BM', flag: '🇧🇲', name: 'Bermuda' },
  { code: '+975', country: 'BT', flag: '🇧🇹', name: 'Bhutan' },
  { code: '+591', country: 'BO', flag: '🇧🇴', name: 'Bolivia' },
  { code: '+387', country: 'BA', flag: '🇧🇦', name: 'Bosnia and Herzegovina' },
  { code: '+267', country: 'BW', flag: '🇧🇼', name: 'Botswana' },
  { code: '+55', country: 'BR', flag: '🇧🇷', name: 'Brazil' },
  { code: '+246', country: 'IO', flag: '🇮🇴', name: 'British Indian Ocean Territory' },
  { code: '+673', country: 'BN', flag: '🇧🇳', name: 'Brunei' },
  { code: '+359', country: 'BG', flag: '🇧🇬', name: 'Bulgaria' },
  { code: '+226', country: 'BF', flag: '🇧🇫', name: 'Burkina Faso' },
  { code: '+257', country: 'BI', flag: '🇧🇮', name: 'Burundi' },
  { code: '+855', country: 'KH', flag: '🇰🇭', name: 'Cambodia' },
  { code: '+237', country: 'CM', flag: '🇨🇲', name: 'Cameroon' },
  { code: '+1', country: 'CA', flag: '🇨🇦', name: 'Canada' },
  { code: '+238', country: 'CV', flag: '🇨🇻', name: 'Cape Verde' },
  { code: '+1345', country: 'KY', flag: '🇰🇾', name: 'Cayman Islands' },
  { code: '+236', country: 'CF', flag: '🇨🇫', name: 'Central African Republic' },
  { code: '+235', country: 'TD', flag: '🇹🇩', name: 'Chad' },
  { code: '+56', country: 'CL', flag: '🇨🇱', name: 'Chile' },
  { code: '+86', country: 'CN', flag: '🇨🇳', name: 'China' },
  { code: '+61', country: 'CX', flag: '🇨🇽', name: 'Christmas Island' },
  { code: '+61', country: 'CC', flag: '🇨🇨', name: 'Cocos Islands' },
  { code: '+57', country: 'CO', flag: '🇨🇴', name: 'Colombia' },
  { code: '+269', country: 'KM', flag: '🇰🇲', name: 'Comoros' },
  { code: '+242', country: 'CG', flag: '🇨🇬', name: 'Congo' },
  { code: '+243', country: 'CD', flag: '🇨🇩', name: 'Congo (DRC)' },
  { code: '+682', country: 'CK', flag: '🇨🇰', name: 'Cook Islands' },
  { code: '+506', country: 'CR', flag: '🇨🇷', name: 'Costa Rica' },
  { code: '+225', country: 'CI', flag: '🇨🇮', name: 'Côte d\'Ivoire' },
  { code: '+385', country: 'HR', flag: '🇭🇷', name: 'Croatia' },
  { code: '+53', country: 'CU', flag: '🇨🇺', name: 'Cuba' },
  { code: '+599', country: 'CW', flag: '🇨🇼', name: 'Curaçao' },
  { code: '+357', country: 'CY', flag: '🇨🇾', name: 'Cyprus' },
  { code: '+420', country: 'CZ', flag: '🇨🇿', name: 'Czech Republic' },
  { code: '+45', country: 'DK', flag: '🇩🇰', name: 'Denmark' },
  { code: '+253', country: 'DJ', flag: '🇩🇯', name: 'Djibouti' },
  { code: '+1767', country: 'DM', flag: '🇩🇲', name: 'Dominica' },
  { code: '+1809', country: 'DO', flag: '🇩🇴', name: 'Dominican Republic' },
  { code: '+593', country: 'EC', flag: '🇪🇨', name: 'Ecuador' },
  { code: '+20', country: 'EG', flag: '🇪🇬', name: 'Egypt' },
  { code: '+503', country: 'SV', flag: '🇸🇻', name: 'El Salvador' },
  { code: '+240', country: 'GQ', flag: '🇬🇶', name: 'Equatorial Guinea' },
  { code: '+291', country: 'ER', flag: '🇪🇷', name: 'Eritrea' },
  { code: '+372', country: 'EE', flag: '🇪🇪', name: 'Estonia' },
  { code: '+251', country: 'ET', flag: '🇪🇹', name: 'Ethiopia' },
  { code: '+500', country: 'FK', flag: '🇫🇰', name: 'Falkland Islands' },
  { code: '+298', country: 'FO', flag: '🇫🇴', name: 'Faroe Islands' },
  { code: '+679', country: 'FJ', flag: '🇫🇯', name: 'Fiji' },
  { code: '+358', country: 'FI', flag: '🇫🇮', name: 'Finland' },
  { code: '+33', country: 'FR', flag: '🇫🇷', name: 'France' },
  { code: '+594', country: 'GF', flag: '🇬🇫', name: 'French Guiana' },
  { code: '+689', country: 'PF', flag: '🇵🇫', name: 'French Polynesia' },
  { code: '+241', country: 'GA', flag: '🇬🇦', name: 'Gabon' },
  { code: '+220', country: 'GM', flag: '🇬🇲', name: 'Gambia' },
  { code: '+995', country: 'GE', flag: '🇬🇪', name: 'Georgia' },
  { code: '+49', country: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: '+233', country: 'GH', flag: '🇬🇭', name: 'Ghana' },
  { code: '+350', country: 'GI', flag: '🇬🇮', name: 'Gibraltar' },
  { code: '+30', country: 'GR', flag: '🇬🇷', name: 'Greece' },
  { code: '+299', country: 'GL', flag: '🇬🇱', name: 'Greenland' },
  { code: '+1473', country: 'GD', flag: '🇬🇩', name: 'Grenada' },
  { code: '+590', country: 'GP', flag: '🇬🇵', name: 'Guadeloupe' },
  { code: '+1671', country: 'GU', flag: '🇬🇺', name: 'Guam' },
  { code: '+502', country: 'GT', flag: '🇬🇹', name: 'Guatemala' },
  { code: '+44', country: 'GG', flag: '🇬🇬', name: 'Guernsey' },
  { code: '+224', country: 'GN', flag: '🇬🇳', name: 'Guinea' },
  { code: '+245', country: 'GW', flag: '🇬🇼', name: 'Guinea-Bissau' },
  { code: '+592', country: 'GY', flag: '🇬🇾', name: 'Guyana' },
  { code: '+509', country: 'HT', flag: '🇭🇹', name: 'Haiti' },
  { code: '+504', country: 'HN', flag: '🇭🇳', name: 'Honduras' },
  { code: '+852', country: 'HK', flag: '🇭🇰', name: 'Hong Kong' },
  { code: '+36', country: 'HU', flag: '🇭🇺', name: 'Hungary' },
  { code: '+354', country: 'IS', flag: '🇮🇸', name: 'Iceland' },
  { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India' },
  { code: '+62', country: 'ID', flag: '🇮🇩', name: 'Indonesia' },
  { code: '+98', country: 'IR', flag: '🇮🇷', name: 'Iran' },
  { code: '+964', country: 'IQ', flag: '🇮🇶', name: 'Iraq' },
  { code: '+353', country: 'IE', flag: '🇮🇪', name: 'Ireland' },
  { code: '+44', country: 'IM', flag: '🇮🇲', name: 'Isle of Man' },
  { code: '+972', country: 'IL', flag: '🇮🇱', name: 'Israel' },
  { code: '+39', country: 'IT', flag: '🇮🇹', name: 'Italy' },
  { code: '+1876', country: 'JM', flag: '🇯🇲', name: 'Jamaica' },
  { code: '+81', country: 'JP', flag: '🇯🇵', name: 'Japan' },
  { code: '+44', country: 'JE', flag: '🇯🇪', name: 'Jersey' },
  { code: '+962', country: 'JO', flag: '🇯🇴', name: 'Jordan' },
  { code: '+7', country: 'KZ', flag: '🇰🇿', name: 'Kazakhstan' },
  { code: '+254', country: 'KE', flag: '🇰🇪', name: 'Kenya' },
  { code: '+686', country: 'KI', flag: '🇰🇮', name: 'Kiribati' },
  { code: '+850', country: 'KP', flag: '🇰🇵', name: 'North Korea' },
  { code: '+82', country: 'KR', flag: '🇰🇷', name: 'South Korea' },
  { code: '+965', country: 'KW', flag: '🇰🇼', name: 'Kuwait' },
  { code: '+996', country: 'KG', flag: '🇰🇬', name: 'Kyrgyzstan' },
  { code: '+856', country: 'LA', flag: '🇱🇦', name: 'Laos' },
  { code: '+371', country: 'LV', flag: '🇱🇻', name: 'Latvia' },
  { code: '+961', country: 'LB', flag: '🇱🇧', name: 'Lebanon' },
  { code: '+266', country: 'LS', flag: '🇱🇸', name: 'Lesotho' },
  { code: '+231', country: 'LR', flag: '🇱🇷', name: 'Liberia' },
  { code: '+218', country: 'LY', flag: '🇱🇾', name: 'Libya' },
  { code: '+423', country: 'LI', flag: '🇱🇮', name: 'Liechtenstein' },
  { code: '+370', country: 'LT', flag: '🇱🇹', name: 'Lithuania' },
  { code: '+352', country: 'LU', flag: '🇱🇺', name: 'Luxembourg' },
  { code: '+853', country: 'MO', flag: '🇲🇴', name: 'Macao' },
  { code: '+389', country: 'MK', flag: '🇲🇰', name: 'North Macedonia' },
  { code: '+261', country: 'MG', flag: '🇲🇬', name: 'Madagascar' },
  { code: '+265', country: 'MW', flag: '🇲🇼', name: 'Malawi' },
  { code: '+60', country: 'MY', flag: '🇲🇾', name: 'Malaysia' },
  { code: '+960', country: 'MV', flag: '🇲🇻', name: 'Maldives' },
  { code: '+223', country: 'ML', flag: '🇲🇱', name: 'Mali' },
  { code: '+356', country: 'MT', flag: '🇲🇹', name: 'Malta' },
  { code: '+692', country: 'MH', flag: '🇲🇭', name: 'Marshall Islands' },
  { code: '+596', country: 'MQ', flag: '🇲🇶', name: 'Martinique' },
  { code: '+222', country: 'MR', flag: '🇲🇷', name: 'Mauritania' },
  { code: '+230', country: 'MU', flag: '🇲🇺', name: 'Mauritius' },
  { code: '+262', country: 'YT', flag: '🇾🇹', name: 'Mayotte' },
  { code: '+52', country: 'MX', flag: '🇲🇽', name: 'Mexico' },
  { code: '+691', country: 'FM', flag: '🇫🇲', name: 'Micronesia' },
  { code: '+373', country: 'MD', flag: '🇲🇩', name: 'Moldova' },
  { code: '+377', country: 'MC', flag: '🇲🇨', name: 'Monaco' },
  { code: '+976', country: 'MN', flag: '🇲🇳', name: 'Mongolia' },
  { code: '+382', country: 'ME', flag: '🇲🇪', name: 'Montenegro' },
  { code: '+1664', country: 'MS', flag: '🇲🇸', name: 'Montserrat' },
  { code: '+212', country: 'MA', flag: '🇲🇦', name: 'Morocco' },
  { code: '+258', country: 'MZ', flag: '🇲🇿', name: 'Mozambique' },
  { code: '+95', country: 'MM', flag: '🇲🇲', name: 'Myanmar' },
  { code: '+264', country: 'NA', flag: '🇳🇦', name: 'Namibia' },
  { code: '+674', country: 'NR', flag: '🇳🇷', name: 'Nauru' },
  { code: '+977', country: 'NP', flag: '🇳🇵', name: 'Nepal' },
  { code: '+31', country: 'NL', flag: '🇳🇱', name: 'Netherlands' },
  { code: '+687', country: 'NC', flag: '🇳🇨', name: 'New Caledonia' },
  { code: '+64', country: 'NZ', flag: '🇳🇿', name: 'New Zealand' },
  { code: '+505', country: 'NI', flag: '🇳🇮', name: 'Nicaragua' },
  { code: '+227', country: 'NE', flag: '🇳🇪', name: 'Niger' },
  { code: '+234', country: 'NG', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+683', country: 'NU', flag: '🇳🇺', name: 'Niue' },
  { code: '+672', country: 'NF', flag: '🇳🇫', name: 'Norfolk Island' },
  { code: '+1670', country: 'MP', flag: '🇲🇵', name: 'Northern Mariana Islands' },
  { code: '+47', country: 'NO', flag: '🇳🇴', name: 'Norway' },
  { code: '+968', country: 'OM', flag: '🇴🇲', name: 'Oman' },
  { code: '+92', country: 'PK', flag: '🇵🇰', name: 'Pakistan' },
  { code: '+680', country: 'PW', flag: '🇵🇼', name: 'Palau' },
  { code: '+970', country: 'PS', flag: '🇵🇸', name: 'Palestine' },
  { code: '+507', country: 'PA', flag: '🇵🇦', name: 'Panama' },
  { code: '+675', country: 'PG', flag: '🇵🇬', name: 'Papua New Guinea' },
  { code: '+595', country: 'PY', flag: '🇵🇾', name: 'Paraguay' },
  { code: '+51', country: 'PE', flag: '🇵🇪', name: 'Peru' },
  { code: '+63', country: 'PH', flag: '🇵🇭', name: 'Philippines' },
  { code: '+48', country: 'PL', flag: '🇵🇱', name: 'Poland' },
  { code: '+351', country: 'PT', flag: '🇵🇹', name: 'Portugal' },
  { code: '+1787', country: 'PR', flag: '🇵🇷', name: 'Puerto Rico' },
  { code: '+974', country: 'QA', flag: '🇶🇦', name: 'Qatar' },
  { code: '+262', country: 'RE', flag: '🇷🇪', name: 'Réunion' },
  { code: '+40', country: 'RO', flag: '🇷🇴', name: 'Romania' },
  { code: '+7', country: 'RU', flag: '🇷🇺', name: 'Russia' },
  { code: '+250', country: 'RW', flag: '🇷🇼', name: 'Rwanda' },
  { code: '+590', country: 'BL', flag: '🇧🇱', name: 'Saint Barthélemy' },
  { code: '+290', country: 'SH', flag: '🇸🇭', name: 'Saint Helena' },
  { code: '+1869', country: 'KN', flag: '🇰🇳', name: 'Saint Kitts and Nevis' },
  { code: '+1758', country: 'LC', flag: '🇱🇨', name: 'Saint Lucia' },
  { code: '+590', country: 'MF', flag: '🇲🇫', name: 'Saint Martin' },
  { code: '+508', country: 'PM', flag: '🇵🇲', name: 'Saint Pierre and Miquelon' },
  { code: '+1784', country: 'VC', flag: '🇻🇨', name: 'Saint Vincent and the Grenadines' },
  { code: '+685', country: 'WS', flag: '🇼🇸', name: 'Samoa' },
  { code: '+378', country: 'SM', flag: '🇸🇲', name: 'San Marino' },
  { code: '+239', country: 'ST', flag: '🇸🇹', name: 'São Tomé and Príncipe' },
  { code: '+966', country: 'SA', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+221', country: 'SN', flag: '🇸🇳', name: 'Senegal' },
  { code: '+381', country: 'RS', flag: '🇷🇸', name: 'Serbia' },
  { code: '+248', country: 'SC', flag: '🇸🇨', name: 'Seychelles' },
  { code: '+232', country: 'SL', flag: '🇸🇱', name: 'Sierra Leone' },
  { code: '+65', country: 'SG', flag: '🇸🇬', name: 'Singapore' },
  { code: '+1721', country: 'SX', flag: '🇸🇽', name: 'Sint Maarten' },
  { code: '+421', country: 'SK', flag: '🇸🇰', name: 'Slovakia' },
  { code: '+386', country: 'SI', flag: '🇸🇮', name: 'Slovenia' },
  { code: '+677', country: 'SB', flag: '🇸🇧', name: 'Solomon Islands' },
  { code: '+252', country: 'SO', flag: '🇸🇴', name: 'Somalia' },
  { code: '+27', country: 'ZA', flag: '🇿🇦', name: 'South Africa' },
  { code: '+500', country: 'GS', flag: '🇬🇸', name: 'South Georgia' },
  { code: '+211', country: 'SS', flag: '🇸🇸', name: 'South Sudan' },
  { code: '+34', country: 'ES', flag: '🇪🇸', name: 'Spain' },
  { code: '+94', country: 'LK', flag: '🇱🇰', name: 'Sri Lanka' },
  { code: '+249', country: 'SD', flag: '🇸🇩', name: 'Sudan' },
  { code: '+597', country: 'SR', flag: '🇸🇷', name: 'Suriname' },
  { code: '+47', country: 'SJ', flag: '🇸🇯', name: 'Svalbard and Jan Mayen' },
  { code: '+268', country: 'SZ', flag: '🇸🇿', name: 'Eswatini' },
  { code: '+46', country: 'SE', flag: '🇸🇪', name: 'Sweden' },
  { code: '+41', country: 'CH', flag: '🇨🇭', name: 'Switzerland' },
  { code: '+963', country: 'SY', flag: '🇸🇾', name: 'Syria' },
  { code: '+886', country: 'TW', flag: '🇹🇼', name: 'Taiwan' },
  { code: '+992', country: 'TJ', flag: '🇹🇯', name: 'Tajikistan' },
  { code: '+255', country: 'TZ', flag: '🇹🇿', name: 'Tanzania' },
  { code: '+66', country: 'TH', flag: '🇹🇭', name: 'Thailand' },
  { code: '+670', country: 'TL', flag: '🇹🇱', name: 'Timor-Leste' },
  { code: '+228', country: 'TG', flag: '🇹🇬', name: 'Togo' },
  { code: '+690', country: 'TK', flag: '🇹🇰', name: 'Tokelau' },
  { code: '+676', country: 'TO', flag: '🇹🇴', name: 'Tonga' },
  { code: '+1868', country: 'TT', flag: '🇹🇹', name: 'Trinidad and Tobago' },
  { code: '+216', country: 'TN', flag: '🇹🇳', name: 'Tunisia' },
  { code: '+90', country: 'TR', flag: '🇹🇷', name: 'Turkey' },
  { code: '+993', country: 'TM', flag: '🇹🇲', name: 'Turkmenistan' },
  { code: '+1649', country: 'TC', flag: '🇹🇨', name: 'Turks and Caicos Islands' },
  { code: '+688', country: 'TV', flag: '🇹🇻', name: 'Tuvalu' },
  { code: '+256', country: 'UG', flag: '🇺🇬', name: 'Uganda' },
  { code: '+380', country: 'UA', flag: '🇺🇦', name: 'Ukraine' },
  { code: '+971', country: 'AE', flag: '🇦🇪', name: 'United Arab Emirates' },
  { code: '+44', country: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+1', country: 'US', flag: '🇺🇸', name: 'United States' },
  { code: '+598', country: 'UY', flag: '🇺🇾', name: 'Uruguay' },
  { code: '+998', country: 'UZ', flag: '🇺🇿', name: 'Uzbekistan' },
  { code: '+678', country: 'VU', flag: '🇻🇺', name: 'Vanuatu' },
  { code: '+379', country: 'VA', flag: '🇻🇦', name: 'Vatican City' },
  { code: '+58', country: 'VE', flag: '🇻🇪', name: 'Venezuela' },
  { code: '+84', country: 'VN', flag: '🇻🇳', name: 'Vietnam' },
  { code: '+1284', country: 'VG', flag: '🇻🇬', name: 'British Virgin Islands' },
  { code: '+1340', country: 'VI', flag: '🇻🇮', name: 'U.S. Virgin Islands' },
  { code: '+681', country: 'WF', flag: '🇼🇫', name: 'Wallis and Futuna' },
  { code: '+212', country: 'EH', flag: '🇪🇭', name: 'Western Sahara' },
  { code: '+967', country: 'YE', flag: '🇾🇪', name: 'Yemen' },
  { code: '+260', country: 'ZM', flag: '🇿🇲', name: 'Zambia' },
  { code: '+263', country: 'ZW', flag: '🇿🇼', name: 'Zimbabwe' },
];

export const EmailPopup = ({ isOpen, onClose }: EmailPopupProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes.find(c => c.country === 'US') || countryCodes[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Remove all non-digit characters for validation
    const cleanPhone = phone.replace(/\D/g, '');
    // Phone should have at least 7 digits and at most 15 digits
    return cleanPhone.length >= 7 && cleanPhone.length <= 15;
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  const validateForm = () => {
    const errors: { name?: string; email?: string; phone?: string } = {};

    if (!validateName(formData.name)) {
      errors.name = 'Name must be at least 2 characters long';
    }

    if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number (7-15 digits)';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      // Check if email already exists
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        setError('This email is already registered. Please use a different email address.');
        setIsSubmitting(false);
        return;
      }

      // Create the entry in Supabase with full phone number including country code
      const fullPhoneNumber = `${selectedCountryCode.code} ${formData.phone}`;
      await createLandingPageEntry({
        ...formData,
        phone: fullPhoneNumber
      });
      
      setIsSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '' });
        setIsSuccess(false);
        setValidationErrors({});
        onClose();
      }, 2000);
      
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear validation error when user starts typing
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors({
        ...validationErrors,
        [name]: undefined
      });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Allow only numbers, spaces, hyphens, and parentheses
    value = value.replace(/[^\d\s\-\(\)]/g, '');
    
    setFormData({
      ...formData,
      phone: value
    });

    // Clear validation error when user starts typing
    if (validationErrors.phone) {
      setValidationErrors({
        ...validationErrors,
        phone: undefined
      });
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setError(null);
      setIsSuccess(false);
      setValidationErrors({});
      setShowCountryDropdown(false);
      onClose();
    }
  };

  const selectCountryCode = (country: typeof countryCodes[0]) => {
    setSelectedCountryCode(country);
    setShowCountryDropdown(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={handleClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="p-8">
          {/* Success State */}
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="font-clash text-2xl font-bold text-dark-slate mb-2">
                Success!
              </h2>
              <p className="font-inter text-body text-dark-slate/70">
                Your guide is being sent to your email. Check your inbox!
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-dark-turquoise/10 px-4 py-2 rounded-full text-dark-turquoise font-inter text-sm font-medium mb-4">
                  <Download className="w-4 h-4" />
                  Instant Download
                </div>
                <h2 className="font-clash text-3xl font-bold text-dark-slate mb-3">
                  Get Your Free Guide
                </h2>
                <p className="font-inter text-body text-dark-slate/70">
                  Enter your details below to receive the guide now.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="font-inter text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block font-inter text-sm font-semibold text-dark-slate mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all font-inter text-body placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed ${
                        validationErrors.name 
                          ? 'border-red-300 focus:ring-2 focus:ring-red-200 focus:border-red-400' 
                          : 'border-gray-200 focus:ring-2 focus:ring-dark-turquoise focus:border-dark-turquoise'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {validationErrors.name && (
                      <p className="mt-1 text-sm text-red-600 font-inter">{validationErrors.name}</p>
                    )}
                  </div>
                  
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block font-inter text-sm font-semibold text-dark-slate mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all font-inter text-body placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed ${
                        validationErrors.email 
                          ? 'border-red-300 focus:ring-2 focus:ring-red-200 focus:border-red-400' 
                          : 'border-gray-200 focus:ring-2 focus:ring-dark-turquoise focus:border-dark-turquoise'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {validationErrors.email && (
                      <p className="mt-1 text-sm text-red-600 font-inter">{validationErrors.email}</p>
                    )}
                  </div>

                  {/* Phone Field with Country Code */}
                  <div className="relative">
                    <label htmlFor="phone" className="block font-inter text-sm font-semibold text-dark-slate mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number *
                    </label>
                    
                    {/* Country Dropdown - positioned above the input */}
                    {showCountryDropdown && (
                      <div className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                        <div className="p-2">
                          <div className="text-xs text-gray-500 font-medium px-3 py-2 border-b border-gray-100">
                            Select Country Code
                          </div>
                          {countryCodes.map((country, index) => (
                            <button
                              key={`${country.code}-${country.country}-${index}`}
                              type="button"
                              onClick={() => selectCountryCode(country)}
                              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left rounded-lg"
                            >
                              <span className="text-lg">{country.flag}</span>
                              <span className="font-medium text-sm min-w-[3rem]">{country.code}</span>
                              <span className="text-sm text-gray-600 truncate">{country.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="relative flex">
                      {/* Country Code Selector */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                          disabled={isSubmitting}
                          className={`flex items-center gap-2 px-3 py-3 rounded-l-xl border-2 border-r-0 transition-all font-inter text-body bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed min-w-[5rem] ${
                            validationErrors.phone 
                              ? 'border-red-300' 
                              : 'border-gray-200 focus:ring-2 focus:ring-dark-turquoise focus:border-dark-turquoise'
                          }`}
                        >
                          <span className="text-lg">{selectedCountryCode.flag}</span>
                          <span className="text-sm font-medium">{selectedCountryCode.code}</span>
                          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      
                      {/* Phone Number Input */}
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        disabled={isSubmitting}
                        className={`flex-1 px-4 py-3 rounded-r-xl border-2 border-l-0 transition-all font-inter text-body placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed ${
                          validationErrors.phone 
                            ? 'border-red-300 focus:ring-2 focus:ring-red-200 focus:border-red-400' 
                            : 'border-gray-200 focus:ring-2 focus:ring-dark-turquoise focus:border-dark-turquoise'
                        }`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {validationErrors.phone && (
                      <p className="mt-1 text-sm text-red-600 font-inter">{validationErrors.phone}</p>
                    )}
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-dark-turquoise hover:bg-dark-turquoise/90 disabled:bg-dark-turquoise/70 text-white px-8 py-4 rounded-xl font-inter font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3 disabled:transform-none disabled:shadow-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending Guide...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>Download Guide Now</span>
                    </>
                  )}
                </button>
                
                <div className="flex items-center justify-center gap-2 text-dark-slate/60 font-inter text-sm">
                  <Shield className="w-4 h-4" />
                  <span>We respect your privacy. No spam, ever.</span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};