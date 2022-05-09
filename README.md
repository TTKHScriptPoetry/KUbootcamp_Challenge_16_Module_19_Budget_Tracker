## KU Bootcamp  
### Challenge 16 Budget Tracker
#### Student Name: Tran, Huong Kim 

##### Deployed Live URL: [Budget Tracker on Heroku](https://kubc-pwa-budget-tracker.herokuapp.com/)
 

##### Repository: [Budget Tracker Github Repository](https://github.com/TTKHScriptPoetry/KUbootcamp_Challenge_16_Module_19_Budget_Tracker)
 
 
##### Project Description:
---------------------------------------------------------------------------------------------------------
##### This project centers in the offline functionality of a money tracking application. The existing app, namely "Budget Tracker", lacks such capability and expects one to fix it using browser's storage mechanism IndexDB as well as service worker for caching data that makes offline loading possible, i.e. at the very least, the basic resources are rendered properly so that end-users can access and submit data entry. The banking transaction is effectivly get submitted once the internet is resumed, i.e. Network is 'online' which in Chrome has the equivalent preset of "Fast 3G". Budget Tracker is also leveraged with a web manifest to become a Progressive Web Application (PWA) which one can downloaded and install on mobile devices.
---------------------------------------------------------------------------------------------------------
#####  Some screenshots
###### Set Network Offline
![1_Set-Network-Offline](https://user-images.githubusercontent.com/100046315/167340763-33880cb1-76a6-43b8-8f28-e52734da7a41.png)

###### Landing page loads when offline per Service Worker's caching prior
![2_Offline_Caching_Service-Worker_LandingPageLoading-Possible](https://user-images.githubusercontent.com/100046315/167340812-7655e99e-3eb0-4dd8-9b5e-1ed29684e968.png)

###### Service Worker's status
![3_Service_Woker_Status](https://user-images.githubusercontent.com/100046315/167341029-094bb54b-f177-43cc-8512-6886bf6e0165.png)

######  Offline transaction fetches failed_with errors - expected
![4_Offline_Transaction-Fetches_Failed_withErrors-Expected](https://user-images.githubusercontent.com/100046315/167341098-575a61f5-4516-4ba5-9180-d42b994f1269.png)

###### Offline transaction saved in storage indexDB instead
![5_Offline_Transaction-Saved-In-Storage_indexDB-instead](https://user-images.githubusercontent.com/100046315/167341297-f39d97b3-338d-45a7-b4ed-d4dacde829a6.png)

 ###### Offline transaction fetches resume successfully when network is back (3G)
![4b_Offline_Transaction-Fetches_Success-Network-Resumes](https://user-images.githubusercontent.com/100046315/167341200-e65c2ec0-adc8-4875-9186-c62811473f10.png)

###### Fetch Status - Green
![4b_Offline_Transaction-Fetches_Request_Status_Green](https://user-images.githubusercontent.com/100046315/167341165-44c9fa49-658a-49cf-9fbd-e569950101aa.png)














