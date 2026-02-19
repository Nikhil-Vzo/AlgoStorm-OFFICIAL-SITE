// Team member images
import aditya from '../assets/images/team-img/piratage_photos/aditya.jpg';
import anshu from '../assets/images/team-img/piratage_photos/anshu.jpg';
import anushka from '../assets/images/team-img/piratage_photos/anushka.jpg';
import ashutosh from '../assets/images/team-img/piratage_photos/ashutosh.webp';
import atharav from '../assets/images/team-img/piratage_photos/atharav.webp';
import biswajit from '../assets/images/team-img/piratage_photos/biswajit.jpg';
import gourav from '../assets/images/team-img/piratage_photos/gourav.jpeg';
import jiya from '../assets/images/team-img/piratage_photos/jiya.jpg';
import kartik from '../assets/images/team-img/piratage_photos/kartik.webp';
import komal from '../assets/images/team-img/piratage_photos/komal.jpg';
import manisha from '../assets/images/team-img/piratage_photos/manisha.webp';
import naman from '../assets/images/team-img/piratage_photos/naman.jpeg';
import nibedita from '../assets/images/team-img/piratage_photos/nibedita.webp';
import nitin from '../assets/images/team-img/piratage_photos/nitin.webp';
import rupendra from '../assets/images/team-img/piratage_photos/rupendra.jpg';
import sakshi from '../assets/images/team-img/piratage_photos/sakshi.webp';
import shraddha from '../assets/images/team-img/piratage_photos/shraddha.jpg';
import shreya from '../assets/images/team-img/piratage_photos/shreya.webp';
import shruti from '../assets/images/team-img/piratage_photos/shruti.jpg';
import swati from '../assets/images/team-img/piratage_photos/swati.jpg';
import tushar from '../assets/images/team-img/piratage_photos/tushar.webp';
import ujjawal from '../assets/images/team-img/piratage_photos/ujjawal.jpg';
import yash from '../assets/images/team-img/piratage_photos/yash.jpg';
import yogesh from '../assets/images/team-img/piratage_photos/yogesh.webp';
import yuti from '../assets/images/team-img/piratage_photos/yuti.jpg';

export interface TeamMember {
    id: number;
    name: string;
    role?: string;
    lead?: boolean;
    image?: string;
}

export interface TeamCategory {
    id: string;
    name: string;
    members: TeamMember[];
}

const teamCategories: TeamCategory[] = [
    {
        id: 'leadership',
        name: 'Leadership',
        members: [
            { id: 0, name: 'Vinay Ku. Singh', role: 'DY. Director' },
            { id: -1, name: 'Kranti Ku. Dewangan', role: 'HOD' },
            { id: -2, name: 'Pawan Kumar', role: 'Faculty Co-ordinator' },
        ],
    },
    {
        id: 'overall',
        name: 'Overall',
        members: [
            { id: 1, name: 'Nitin Kumar Singh', image: nitin },
            { id: 2, name: 'Biswajit Nayak', image: biswajit },
        ],
    },
    {
        id: 'technical',
        name: 'Technical',
        members: [
            { id: 3, name: 'Nikhil Yadav' },
        ],
    },
    {
        id: 'design',
        name: 'Design',
        members: [
            { id: 4, name: 'Aditya Chourasia', lead: true, image: aditya },
            { id: 5, name: 'Ashutosh Sahu', image: ashutosh },
            { id: 6, name: 'Atharav Pratap Singh', image: atharav },
            { id: 7, name: 'Rupendra Kumar Sahu', image: rupendra },
        ],
    },
    {
        id: 'social-media',
        name: 'Social Media',
        members: [
            { id: 8, name: 'Gourav Kumar Behera', lead: true, image: gourav },
            { id: 9, name: 'Tushar Shendey', image: tushar },
            { id: 10, name: 'Shreya Barde', image: shreya },
            { id: 11, name: 'Jiya Dhand', image: jiya },
            { id: 12, name: 'Komal Meghani', image: komal },
        ],
    },
    {
        id: 'financial-sponsorship',
        name: 'Financial & Sponsorship',
        members: [
            { id: 13, name: 'Manisha Biswal', image: manisha },
            { id: 14, name: 'Naman Kumar', image: naman },
            { id: 15, name: 'Anshu', image: anshu },
        ],
    },
    {
        id: 'logistics-hospitality',
        name: 'Logistics & Hospitality',
        members: [
            { id: 16, name: 'Yuti Sasane', lead: true, image: yuti },
            { id: 17, name: 'Ujjawal Singh', image: ujjawal },
            { id: 18, name: 'Shruti Kumari', image: shruti },
            { id: 19, name: 'Kartik Shreekumar', image: kartik },
            { id: 20, name: 'Yogesh Sunil Wathe', image: yogesh },
        ],
    },
    {
        id: 'registration',
        name: 'Registration Committee',
        members: [
            { id: 21, name: 'Sakshi Bhatt', image: sakshi },
            { id: 22, name: 'Anushka Choudhary', image: anushka },
            { id: 23, name: 'Swati Agrawal', image: swati },
            { id: 24, name: 'Nibedita Patel', image: nibedita },
        ],
    },
    {
        id: 'volunteering-support',
        name: 'Volunteering & Support',
        members: [
            { id: 25, name: 'Shraddha Sahu', lead: true, image: shraddha },
            { id: 26, name: 'Yash Bhikhwani', image: yash },
        ],
    },
];

export default teamCategories;
