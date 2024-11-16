import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  whyChooseGroupix = [
    {
      image: './assets/images/why_choose/image_1.png',
      title: 'Create Groups Easily',
      description:
        'Set up your group in just a few clicks and add friends to group. Collaboration has never been simpler.',
    },
    {
      image: './assets/images/why_choose/image_2.png',
      title: 'Track Your Spending',
      description:
        'Keep an eye on who owes what with real-time updates on group expenses and contributions.',
    },
    {
      image: './assets/images/why_choose/image_3.png',
      title: 'Settle Up Instantly',
      description:
        'Easily split costs and settle balances directly through the app, making group outings hassle-free.',
    },
  ];

  howItWorks = [
    {
      order: 1,
      title: 'Create a Group',
      description:
        'Set up your group in just a few clicks and invite friends to join. Collaboration has never been simpler.',
    },
    {
      order: 2,
      title: 'Add Expenses',
      description:
        'Keep an eye on who owes what with real-time updates on group expenses and contributions.',
    },
    {
      order: 3,
      title: 'Settle Up',
      description:
        'Easily split costs and settle balances directly through the app, making group outings hassle-free.',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
