// Mock data for Hong Kong hiking trails
// Based on information from Hong Kong Tourism Board

export const trailsData = [
  {
    id: 1,
    name: "Dragon's Back to Big Wave Bay",
    chinese_name: "龍脊 → 大浪灣",
    location: "Shek O Country Park, Hong Kong Island",
    rating: 4.7,
    reviews_count: 1526,
    difficulty: "Moderate",
    length_miles: 4.5,
    length_km: 7.24,
    elevation_gain_ft: 725,
    elevation_gain_m: 221,
    estimated_time_hours: "2–2.5",
    route_type: "Point to point",
    description: "A well-known ridge trail offering panoramic ocean views, connecting Dragon's Back to Big Wave Bay. The route is easily accessible by public transportation and is popular for hiking, sightseeing, and ending at the beach.",
    top_sights: [
      {
        name: "Dragon's Back Viewing Point",
        type: "Viewpoint"
      },
      {
        name: "Shek O Peak",
        type: "Peak"
      },
      {
        name: "Pearl River Estuary",
        type: "Bay"
      }
    ],
    image: "https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNjU3NjE3MTgvYjU1OGU4OGI3NGE0ZTgxZTMyYmVlNDllZDdhNjc5ZGEuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ=="
  },
  {
    id: 2,
    name: "Victoria Peak Loop",
    chinese_name: "太平山顶环回步道",
    location: "Pok Fu Lam Country Park, Central and Western District",
    rating: 4.7,
    reviews_count: 1040,
    difficulty: "Easy",
    length_miles: 2.2,
    length_km: 3.54,
    elevation_gain_ft: 410,
    elevation_gain_m: 125,
    estimated_time_hours: "1–1.5",
    route_type: "Loop",
    description: "A scenic circular trail around Victoria Peak offering famous skyline views of Victoria Harbour, Central, Kowloon, and the surrounding mountains. The Lugard Road section features a narrow cliffside path with panoramic viewpoints, while Harlech Road provides views towards Hong Kong Island's south side.",
    top_sights: [
      {
        name: "Lugard Falls",
        type: "Waterfall"
      },
      {
        name: "Lugard Road Lookout",
        type: "Viewpoint"
      },
      {
        name: "High West Picnic Area",
        type: "Picnic site"
      }
    ],
    image: "https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvMTE1MzI3NjU5LzgxMGQzYWQwZGZlOWFkMDk1NzlkMGEwYzFhMDZlZGUzLmpwZyIsImVkaXRzIjp7InRvRm9ybWF0Ijoid2VicCIsInJlc2l6ZSI6eyJ3aWR0aCI6MjA0OCwiaGVpZ2h0IjoyMDQ4LCJmaXQiOiJpbnNpZGUifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0="
  },
  {
    id: 3,
    name: "Twin Peaks",
    chinese_name: "孖岗山（Ma Kong Shan）",
    location: "Tai Tam Country Park, Southern District",
    rating: 4.6,
    reviews_count: 901,
    difficulty: "Hard",
    length_miles: 2.9,
    length_km: 4.67,
    elevation_gain_ft: 1282,
    elevation_gain_m: 391,
    estimated_time_hours: "2.5–3",
    route_type: "Point to point",
    description: "A challenging trail featuring many steep stair climbs, popular among both tourists and locals. The two summits offer impressive ocean and mountain views. Known for its intensity and rewarding scenery at the peaks.",
    top_sights: [
      {
        name: "Violet Hill",
        type: "Peak"
      },
      {
        name: "Stanley Mound",
        type: "Peak"
      },
      {
        name: "North Peak, The Twins",
        type: "Peak"
      }
    ],
    image: "https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTEwMzMyNzcvNzU4MWRjNTFiMjA3NWIyZTg5Yjk3MGE2YThmMjZkZjYuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ=="
  },
  {
    id: 4,
    name: "Lion Rock",
    chinese_name: "獅子山",
    location: "Lion Rock Country Park, Sha Tin District",
    rating: 4.6,
    reviews_count: 540,
    difficulty: "Moderate",
    length_miles: 2.4,
    length_km: 3.86,
    elevation_gain_ft: 1292,
    elevation_gain_m: 394,
    estimated_time_hours: "3–4",
    route_type: "Out & back",
    description: "One of Hong Kong's most iconic hikes, known for its dramatic summit overlooking Kowloon, Hong Kong Island, and the New Territories. The trail features both shaded and exposed sections, with scenic views throughout. Best visited on a clear day to enjoy wide panoramic vistas.",
    top_sights: [
      {
        name: "Lion Head",
        type: "Peak"
      },
      {
        name: "Hung Mui Kuk",
        type: "Valley"
      },
      {
        name: "Cheung Hang Leng",
        type: "Peak"
      }
    ],
    image: "https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvODUxNDMwOTkvNDRjZDcyZmE1MWM0NDg5MGQ4MmYzMjM3ZmNmNjMwNzkuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ=="
  },
  {
    id: 5,
    name: "Lantau Trail: Section 3",
    chinese_name: "鳳凰徑第 3 段",
    location: "Lantau South Country Park, Lantau Island",
    rating: 4.6,
    reviews_count: 620,
    difficulty: "Hard",
    length_miles: 2.8,
    length_km: 4.51,
    elevation_gain_ft: 1833,
    elevation_gain_m: 559,
    estimated_time_hours: "2.5–3",
    route_type: "Point to point",
    description: "A steep and demanding section of the Lantau Trail stretching from Pak Kung Au to Ngong Ping. This route ascends towards Lantau Peak, the highest mountain on Lantau Island, featuring expansive mountain and coastal scenery. It is a popular and strenuous trail with rewarding views.",
    top_sights: [
      {
        name: "Lantau Peak",
        type: "Peak"
      },
      {
        name: "南天門尾瀑",
        type: "Waterfall"
      },
      {
        name: "陰陽壁",
        type: "Cliff"
      }
    ],
    image: "https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNDM3NzIyNDUvMDMyYjE2ZmY4ODU4ZjRlOTZiNzgwNWZlODQ4NGExYzguanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ=="
  },
  {
    id: 6,
    name: "High Junk Peak Country Trail",
    chinese_name: "釣魚翁郊遊徑",
    location: "Clearwater Bay Country Park, Sai Kung",
    rating: 4.6,
    reviews_count: 808,
    difficulty: "Moderate",
    length_miles: 3.8,
    length_km: 6.12,
    elevation_gain_ft: 1217,
    elevation_gain_m: 371,
    estimated_time_hours: "2.5–3",
    route_type: "Point to point",
    description: "A scenic coastal countryside trail with dirt paths and stair sections at the start and end. It features views of Clear Water Bay and the surrounding islands. The High Junk Peak detour offers a steep climb over two peaks. Some areas are narrow and overgrown, adding challenge and excitement.",
    top_sights: [
      {
        name: "High Junk Peak",
        type: "Peak"
      },
      {
        name: "Miu Tsai Tun",
        type: "Peak"
      },
      {
        name: "Pearl River Estuary",
        type: "Bay"
      }
    ],
    image: "https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvMTEzMjc0MDg0LzliYmI0Y2VjZmJhMDQwOTRkN2U0MmYzYmQwNjc3NjBjLmpwZyIsImVkaXRzIjp7InRvRm9ybWF0Ijoid2VicCIsInJlc2l6ZSI6eyJ3aWR0aCI6MjA0OCwiaGVpZ2h0IjoyMDQ4LCJmaXQiOiJpbnNpZGUifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0="
  },
  {
    id: 7,
    name: "Lamma Island Hike",
    chinese_name: "南丫岛行山路线",
    location: "Lamma Island, Hong Kong",
    rating: 4.5,
    reviews_count: 699,
    difficulty: "Moderate",
    length_miles: 3.7,
    length_km: 5.95,
    elevation_gain_ft: 360,
    elevation_gain_m: 110,
    estimated_time_hours: "1.5–2",
    route_type: "Point to point",
    description: "A popular coastal hike across Lamma Island featuring relaxed seaside villages, beaches, waterfront paths, and gentle hills. Known for its laid-back atmosphere, ocean views, and access to Hong Kong's iconic outlying-island lifestyle. Very popular on weekends among locals and tourists.",
    top_sights: [
      {
        name: "Hung Shing Yeh Beach",
        type: "Beach"
      },
      {
        name: "Kamikaze Grottos",
        type: "Cave"
      },
      {
        name: "Yung Shue Wan",
        type: "Bay"
      }
    ],
    image: "https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvOTkyNzIxNzIvYTc4YTc5NjQ2OGZmZTUzNTdmZDUxMTAwYzA4NWViM2EuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ=="
  },
  {
    id: 8,
    name: "Hong Kong Trail: Section 1, 2, and 3",
    chinese_name: "港島徑第 1、2、3 段",
    location: "The Peak, Central and Western District, Hong Kong",
    rating: 4.4,
    reviews_count: 457,
    difficulty: "Hard",
    length_miles: 10.8,
    length_km: 17.38,
    elevation_gain_ft: 1729,
    elevation_gain_m: 527,
    estimated_time_hours: "5.5–6",
    route_type: "Point to point",
    description: "This long, scenic route begins at The Peak on Section 1, offering panoramic postcard views of Victoria Harbour before descending toward Pok Fu Lam Reservoir, the first reservoir built in Hong Kong. After the reservoir, the trail climbs thousands of stone steps through shaded forest. The mixed dirt and paved path provides excellent variety and rich natural scenery across the western part of Hong Kong Island.",
    top_sights: [
      {
        name: "High West",
        type: "Peak"
      },
      {
        name: "Lugard Road Lookout",
        type: "Viewpoint"
      },
      {
        name: "Aberdeen Upper Reservoir",
        type: "Reservoir"
      }
    ],
    image: "https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvODU0NTE2MTQvNzVmNmFhN2I1ZDcyMTEwMDk1ZDhhNzllOTA2MzMyYzYuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ=="
  },
  {
    id: 9,
    name: "Old Peak Road",
    chinese_name: "旧山顶道",
    location: "Pok Fu Lam Country Park, Hong Kong",
    rating: 4.5,
    reviews_count: 451,
    difficulty: "Moderate",
    length_miles: 1.0,
    length_km: 1.61,
    elevation_gain_ft: 807,
    elevation_gain_m: 246,
    estimated_time_hours: "0.5–1",
    route_type: "Point to point",
    description: "This historic uphill path was once used by porters carrying wealthy residents in sedan chairs before the Peak Tram was built in 1888. The route climbs through a lush subtropical forest within Pok Fu Lam Country Park, featuring banyan trees and shaded paths. The highlight is the panoramic view of Victoria Harbour and Hong Kong Island's skyline as you ascend.",
    top_sights: [
      {
        name: "Old Peak Road Rest Garden",
        type: "Garden"
      },
      {
        name: "The Peak Lions Viewpoint",
        type: "Viewpoint"
      },
      {
        name: "Old Peak Road Public Toilet",
        type: "Bathroom"
      }
    ],
    image: "https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNjk3MTgwNDgvZGU4ZGIyNzk4NzJkNTQ3ZDNmY2U1NGI4MTc3N2Y3MjUuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ=="
  },
  {
    id: 10,
    name: "Wilson Trail: Section 1",
    chinese_name: "衞奕信徑第1段",
    location: "Tai Tam Country Park, Hong Kong",
    rating: 4.7,
    reviews_count: 314,
    difficulty: "Hard",
    length_miles: 3.1,
    length_km: 4.99,
    elevation_gain_ft: 1893,
    elevation_gain_m: 577,
    estimated_time_hours: "2.5–3",
    route_type: "Point to point",
    description: "Wilson Trail Section 1 begins at Stanley Gap Road, traverses Tai Tam Country Park, and ends at Wong Nai Chung Reservoir. The terrain includes pavement, dirt paths, and long stair sections. This route offers sweeping views of the Tai Tam reservoirs and surrounding mountains.",
    top_sights: [
      {
        name: "Violet Hill",
        type: "Peak"
      },
      {
        name: "Stanley Mound",
        type: "Peak"
      },
      {
        name: "Deep Water Bay Valley",
        type: "Valley"
      }
    ],
    image: "https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTM4MDU2MTEvNzgzZWNkMjA4ZmVjNTRhYTNmNWNiNDQzZDNiMmVmYWYuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ=="
  }
];
