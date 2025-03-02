import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import { DnPagination } from "@/shared/components/DnPagination";

const HospitalMap = () => {
  const mapContainer = useRef(null);
  const [kakaoMap, setKakaoMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [registeredHospitals, setRegisteredHospitals] = useState([]);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const itemsPerPage = 5;

  const fetchRegisteredHospitals = async () => {
    const mockData = [
      {
        id: 1,
        name: "서울동물병원",
        address: "서울시 강남구 역삼동 123",
        lat: 37.501264,
        lng: 127.039729,
      },
      {
        id: 2,
        name: "행복한동물병원",
        address: "서울시 서초구 방배동 456",
        lat: 37.481877,
        lng: 126.999679,
      },
      {
        id: 3,
        name: "우리동물병원",
        address: "서울시 강남구 삼성동 789",
        lat: 37.508906,
        lng: 127.056451,
      },
      {
        id: 4,
        name: "건강한동물병원",
        address: "서울시 송파구 잠실동 123",
        lat: 37.513699,
        lng: 127.098067,
      },
      {
        id: 5,
        name: "즐거운동물병원",
        address: "서울시 서초구 반포동 456",
        lat: 37.504229,
        lng: 127.019376,
      },
    ];
    setRegisteredHospitals(mockData);
  };

  const loadKakaoMapScript = () => {
    if (window.kakao && window.kakao.maps) {
      initializeMap();
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_API_KEY ||
      "0a3a2185ccbb6c5c6647e8a1604f823b"
    }&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        initializeMap();
      });
    };

    return () => script.remove();
  };

  const initializeMap = () => {
    if (!mapContainer.current) return;

    const options = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 5,
    };

    const map = new window.kakao.maps.Map(mapContainer.current, options);
    setKakaoMap(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const currentPosition = new window.kakao.maps.LatLng(lat, lng);

          map.setCenter(currentPosition);

          const marker = new window.kakao.maps.Marker({
            position: currentPosition,
            map: map,
          });

          setMarkers([marker]);
          searchNearbyHospitals(lat, lng, map);
        },
        (error) => {
          searchNearbyHospitals(37.566826, 126.9786567, map);
        }
      );
    } else {
      searchNearbyHospitals(37.566826, 126.9786567, map);
    }
  };

  const searchNearbyHospitals = (lat, lng, map) => {
    if (!map) return;

    const places = new window.kakao.maps.services.Places();

    const callback = function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        setNearbyHospitals(result);
        setTotalPage(Math.ceil(result.length / itemsPerPage));
      }
    };

    places.keywordSearch("동물병원", callback, {
      location: new window.kakao.maps.LatLng(lat, lng),
      radius: 5000,
      sort: window.kakao.maps.services.SortBy.DISTANCE,
    });
  };

  const searchByKeyword = () => {
    if (!kakaoMap || !keyword.trim()) return;

    const places = new window.kakao.maps.services.Places();

    const callback = function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        markers.forEach((marker) => marker.setMap(null));

        const bounds = new window.kakao.maps.LatLngBounds();
        const newMarkers = result.map((place) => {
          const position = new window.kakao.maps.LatLng(place.y, place.x);

          const marker = new window.kakao.maps.Marker({
            map: kakaoMap,
            position: position,
          });

          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`,
          });

          window.kakao.maps.event.addListener(marker, "click", function () {
            infowindow.open(kakaoMap, marker);
          });

          bounds.extend(position);
          return marker;
        });

        setMarkers(newMarkers);
        setNearbyHospitals(result);
        setTotalPage(Math.ceil(result.length / itemsPerPage));

        if (newMarkers.length > 0) {
          kakaoMap.setBounds(bounds);
        }
      }
    };

    places.keywordSearch(keyword, callback);
  };

  const selectHospital = (hospital) => {
    setSelectedHospital(hospital);

    if (kakaoMap) {
      const position = new window.kakao.maps.LatLng(
        hospital.y || hospital.lat,
        hospital.x || hospital.lng
      );

      kakaoMap.setCenter(position);
      kakaoMap.setLevel(3);

      markers.forEach((marker) => marker.setMap(null));

      const marker = new window.kakao.maps.Marker({
        position: position,
        map: kakaoMap,
      });

      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;">${
          hospital.place_name || hospital.name
        }</div>`,
      });

      infowindow.open(kakaoMap, marker);
      setMarkers([marker]);
    }
  };

  const handlePageChange = (pageNumber) => {
    let newPage = pageNumber;

    if (pageNumber === "prev" && currentPage > 1) {
      newPage = currentPage - 1;
    } else if (pageNumber === "next" && currentPage < totalPage) {
      newPage = currentPage + 1;
    } else if (typeof pageNumber === "number") {
      newPage = pageNumber;
    } else {
      return;
    }

    setCurrentPage(newPage);
  };

  useEffect(() => {
    const initializeKakaoMap = () => {
      if (mapContainer.current) {
        loadKakaoMapScript();
      }
    };

    initializeKakaoMap();
    fetchRegisteredHospitals();

    return () => {
      if (markers.length) {
        markers.forEach((marker) => {
          marker.setMap(null);
        });
      }
    };
  }, []);

  const paginatedNearbyHospitals = nearbyHospitals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <HospitalMapLayout>
      <SidebarContainer>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="병원명 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                searchByKeyword();
              }
            }}
          />
          <SearchButton onClick={searchByKeyword}>검색</SearchButton>
        </SearchContainer>

        <ListContainer>
          <ListTitle>등록된 병원</ListTitle>
          <HospitalList>
            {registeredHospitals.map((hospital) => (
              <HospitalItem
                key={hospital.id}
                onClick={() => selectHospital(hospital)}
                isSelected={
                  selectedHospital && selectedHospital.id === hospital.id
                }
              >
                <HospitalName>{hospital.name}</HospitalName>
                <HospitalAddress>{hospital.address}</HospitalAddress>
              </HospitalItem>
            ))}
          </HospitalList>
        </ListContainer>

        <ListContainer>
          <ListTitle>주변 동물병원</ListTitle>
          <HospitalList>
            {paginatedNearbyHospitals.map((hospital, index) => (
              <HospitalItem
                key={index}
                onClick={() => selectHospital(hospital)}
                isSelected={
                  selectedHospital &&
                  selectedHospital.place_name === hospital.place_name
                }
              >
                <HospitalName>{hospital.place_name}</HospitalName>
                <HospitalAddress>
                  {hospital.address_name || hospital.road_address_name}
                </HospitalAddress>
                <HospitalDistance>
                  {(hospital.distance && `${hospital.distance}m`) || ""}
                </HospitalDistance>
              </HospitalItem>
            ))}
          </HospitalList>
        </ListContainer>

        <PaginationContainer>
          <DnPagination
            totalPage={totalPage}
            getClickedPageNumber={handlePageChange}
          />
        </PaginationContainer>
      </SidebarContainer>

      <MapContainer ref={mapContainer} />
    </HospitalMapLayout>
  );
};

const HospitalMapLayout = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 130px);
  margin-top: 130px;
`;

const SidebarContainer = styled.div`
  width: 350px;
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
`;

const SearchContainer = styled.div`
  padding: 16px;
  display: flex;
  gap: 8px;
  border-bottom: 1px solid #e0e0e0;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  background-color: #3396f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #2980b9;
  }
`;

const ListContainer = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  flex: 1;
`;

const ListTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
`;

const HospitalList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const HospitalItem = styled.li`
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#f0f7ff" : "#f8f8f8")};
  border: 1px solid ${(props) => (props.isSelected ? "#3396f4" : "#ebebeb")};

  &:hover {
    background-color: #f0f7ff;
  }
`;

const HospitalName = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
`;

const HospitalAddress = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
`;

const HospitalDistance = styled.div`
  font-size: 12px;
  color: #3396f4;
  font-weight: 500;
`;

const MapContainer = styled.div`
  flex: 1;
  height: 100%;
  min-height: 500px;
`;

const PaginationContainer = styled.div`
  padding: 16px;
  display: flex;
  justify-content: center;
`;

export default HospitalMap;