import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  features = [
    {
      icon: 'bi-trophy',
      title: 'Live Matches',
      description: 'Watch your favorite sports events live with high-quality streaming and real-time updates.'
    },
    {
      icon: 'bi-collection-play',
      title: 'Match Replays',
      description: 'Missed a match? No problem! Access our extensive library of match replays anytime.'
    },
    {
      icon: 'bi-calendar-event',
      title: 'Match Schedule',
      description: 'Stay updated with our comprehensive match schedule and never miss an important game.'
    },
    {
      icon: 'bi-person-video3',
      title: 'Expert Commentary',
      description: 'Enjoy professional commentary and analysis from experienced sports experts.'
    }
  ];

  stats = [
    { number: '1000+', label: 'Live Matches' },
    { number: '50+', label: 'Sports Categories' },
    { number: '1M+', label: 'Active Users' },
    { number: '24/7', label: 'Support' }
  ];
} 